import { createClient } from '@supabase/supabase-js';

const bucket = 'home-away';

const url = process.env.SUPABASE_URL as string;
const key = process.env.SUPABASE_KEY as string;

// Create a single supabase client to interact with the database
const supabase = createClient(url, key);

export const uploadImage = async (image: File) => {
  const timestamp = Date.now();
  // Save the image to the storage bucket in a users folder
  const newName = `/users/${timestamp}-${image.name}`;
  const { data } = await supabase.storage
    .from(bucket)
    .upload(newName, image, { cacheControl: '3600' });
  if (!data) throw new Error('Image upload failed');
  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};