import Hero from '@components/Hero';
import Card from '@components/Card';
import '@root/global.scss';
import Link from 'next/link';
// ... existing code ...

export default function SupportPage() {
  return (
    <>    
      <Hero word="Support" />
      <Card>
        <p>
          {/* Your paragraph content here */}
        </p>
      </Card>
    </>
  );
}

// ... existing code ...