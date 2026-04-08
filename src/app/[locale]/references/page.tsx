import { getTranslations } from 'next-intl/server';
import ReferencesContent, { type TestimonialItem } from './_content';

export default async function ReferencesPage() {
  const tRef  = await getTranslations('References');
  const tTest = await getTranslations('Testimonials');

  const rawItems = tTest.raw('items');
  const testimonialItems: TestimonialItem[] = Array.isArray(rawItems) ? rawItems : [];

  return (
    <ReferencesContent
      pageSubtitle={tRef('subtitle')}
      pageTitle={tRef('title')}
      testimonialItems={testimonialItems}
      testimonialSubtitle={tTest('subtitle')}
      testimonialTitle={tTest('title')}
    />
  );
}
