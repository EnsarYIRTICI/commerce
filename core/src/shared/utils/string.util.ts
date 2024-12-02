import slugify from 'slugify';

function createSlug(name: string): string {
  return slugify(name, { lower: true, strict: true });
}

export { createSlug };
