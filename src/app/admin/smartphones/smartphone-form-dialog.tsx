'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { Smartphone } from '@/entities/product/model/types';
import { toast } from '@/hooks/use-toast';
import {
  useCreateSmartphoneMutation,
  useUpdateSmartphoneMutation,
} from '@/shared/lib/slices/productApi';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Switch } from '@/shared/ui/switch';
import { Textarea } from '@/shared/ui/textarea';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const formSchema = yup.object({
  name: yup.string().min(2).required('Název je povinný'),
  slug: yup
    .string()
    .matches(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Slug musí být ve formátu: slovo-slovo-slovo')
    .required('Slug je povinný'),
  price: yup.number().positive().required('Cena je povinná'),
  capacity: yup.number().positive().required('Kapacita je povinná'),
  color: yup.string().min(2).required('Barva je povinná'),
  small_desc: yup.string().optional(),
  large_desc: yup.string().min(10).required('Dlouhý popis je povinný'),
  gallery: yup
    .mixed()
    .test('required', 'Je vyžadován alespoň jeden obrázek.', (value) => {
      const files = value as FileList;
      return files && files.length > 0;
    })
    .test('fileSize', 'Maximální velikost souboru je 5MB.', (value) => {
      if (!value) return true;
      const files = value as FileList;
      return Array.from(files).every((file) => file.size <= MAX_FILE_SIZE);
    })
    .test('fileType', 'Jsou přijímány soubory .jpg, .jpeg, .png a .webp.', (value) => {
      if (!value) return true;
      const files = value as FileList;
      return Array.from(files).every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type));
    })
    .optional(),
  active: yup.boolean().required(),
});

const updateFormSchema = formSchema.omit(['gallery']).shape({
  gallery: yup.mixed().optional(),
});

type SmartphoneFormData = yup.InferType<typeof formSchema>;
type UpdateSmartphoneFormData = yup.InferType<typeof updateFormSchema>;

interface SmartphoneFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  smartphone?: Smartphone;
}

const capacityOptions = [
  { value: '64', label: '64 GB' },
  { value: '128', label: '128 GB' },
  { value: '256', label: '256 GB' },
  { value: '512', label: '512 GB' },
  { value: '1024', label: '1 TB' },
];

const nameOptions = [
  'iPhone 15 Pro Max',
  'iPhone 15 Pro',
  'iPhone 15 Plus',
  'iPhone 15',
  'iPhone 14 Pro Max',
  'iPhone 14 Pro',
  'iPhone 14 Plus',
  'iPhone 14',
  'iPhone 13',
  'iPhone 13 Mini',
  'iPhone 12',
  'iPhone SE',
];

const colorOptions = [
  'Natural Titanium',
  'Blue Titanium',
  'White Titanium',
  'Black Titanium',
  'Blue',
  'Pink',
  'Yellow',
  'Green',
  'Black',
  'Starlight',
  'Midnight',
  'Purple',
  'Red',
];

export function SmartphoneFormDialog({
  open,
  onOpenChange,
  smartphone,
}: SmartphoneFormDialogProps) {
  const [createSmartphone, { isLoading: isCreating }] = useCreateSmartphoneMutation();
  const [updateSmartphone, { isLoading: isUpdating }] = useUpdateSmartphoneMutation();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const isUpdate = Boolean(smartphone);

  const form = useForm<SmartphoneFormData | UpdateSmartphoneFormData>({
    resolver: yupResolver(isUpdate ? updateFormSchema : formSchema),
    defaultValues: isUpdate
      ? smartphone
      : {
          name: '',
          slug: '',
          price: 0,
          capacity: 64,
          color: '',
          small_desc: '',
          large_desc: '',
          gallery: undefined,
          active: true,
        },
  });

  useEffect(() => {
    if (open) {
      if (smartphone) {
        form.reset({
          name: smartphone.name,
          slug: smartphone.slug || '',
          price: smartphone.price,
          capacity: smartphone.capacity,
          color: smartphone.color,
          small_desc: smartphone.small_desc,
          large_desc: smartphone.large_desc,
          gallery: undefined,
          active: smartphone.active,
        });
        setImagePreviews(smartphone.gallery || []);
      } else {
        form.reset({
          name: '',
          slug: '',
          price: 0,
          capacity: 64,
          color: '',
          small_desc: '',
          large_desc: '',
          gallery: undefined,
          active: true,
        });
        setImagePreviews([]);
      }
    }
  }, [smartphone, form, open]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      form.setValue('gallery', files as any);
      const newPreviews = Array.from(files).map((file) => URL.createObjectURL(file));
      setImagePreviews(newPreviews);
    }
  };

  async function onSubmit(values: SmartphoneFormData | UpdateSmartphoneFormData) {
    try {
      if (isUpdate) {
        const changedData = new FormData();
        let hasChanges = false;
        (Object.keys(values) as Array<keyof typeof values>).forEach((key) => {
          const formValue = values[key];
          const initialValue = smartphone?.[key as keyof Smartphone];

          if (key === 'gallery') {
            const files = formValue as FileList | undefined;
            if (files && files.length > 0) {
              Array.from(files).forEach((file) => {
                changedData.append('gallery', file);
              });
              hasChanges = true;
            }
          } else if (String(formValue) !== String(initialValue)) {
            changedData.append(key, String(formValue));
            hasChanges = true;
          }
        });

        if (hasChanges) {
          await updateSmartphone({ id: smartphone!.id, body: changedData }).unwrap();
          toast({ title: 'Úspěch', description: 'Smartphone byl úspěšně aktualizován.' });
        } else {
          toast({ title: 'Žádné změny', description: 'Nebyly změněny žádné pole.' });
        }
      } else {
        const body = new FormData();
        (Object.keys(values) as Array<keyof typeof values>).forEach((key) => {
          const value = values[key];
          if (key === 'gallery') {
            const files = value as FileList;
            if (files) {
              Array.from(files).forEach((file) => {
                body.append('gallery', file);
              });
            }
          } else {
            body.append(key, typeof value === 'boolean' ? String(value) : String(value ?? ''));
          }
        });

        await createSmartphone(body).unwrap();
        toast({ title: 'Úspěch', description: 'Smartphone byl úspěšně vytvořen.' });
      }

      onOpenChange(false);
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        variant: 'destructive',
        title: 'Chyba',
        description: 'Něco se pokazilo.',
      });
    }
  }

  const isLoading = isCreating || isUpdating;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[725px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isUpdate ? 'Upravit smartphone' : 'Přidat nový smartphone'}</DialogTitle>
          <DialogDescription>
            {isUpdate ? 'Upravte detaily smartphonu.' : 'Vyplňte detaily pro nový smartphone.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Název</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value?.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Vyberte název" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {nameOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="iphone-15-pro-max" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cena</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} value={field.value || 0} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kapacita (GB)</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value, 10))}
                      value={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Vyberte kapacitu" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {capacityOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Barva</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value?.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Vyberte barvu" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {colorOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="small_desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Krátký popis</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="large_desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dlouhý popis</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gallery"
              render={({ field: _field }) => (
                <FormItem>
                  <FormLabel>Galerie</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="file:border-0 file:bg-transparent file:text-sm file:font-medium"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="relative aspect-square w-full">
                    <Image
                      src={src}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                ))}
              </div>
            )}
            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Aktivní</FormLabel>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                Zrušit
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Ukládání...' : 'Uložit'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
