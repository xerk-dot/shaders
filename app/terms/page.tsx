import Hero from '@components/Hero';
import Card from '@components/Card';
import '@root/global.scss';
// ... existing code ...

export default function TermsPage() {
  return (
<>
      <Hero word="Terms of Service" />
      <Card>
        <p>
          {/* Your paragraph content here */}
        </p>
      </Card>
    </>
  );
}
