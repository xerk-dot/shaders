import Hero from '@components/Hero';
import Card from '@components/Card';
import '@root/global.scss';
import Link from 'next/link';
import TreeView from '@components/TreeView';

export default function FAQsPage() {
  return (
    <>
      <Hero word="FAQs" />
      <Card title="Frequently Asked Questions">
        <TreeView defaultValue={true} isRoot title="FAQ Categories">
          <TreeView defaultValue={false} title="Getting Started">
            <TreeView 
              title="How do I create an account?"
              isFile
              answer="Simply click the 'Sign Up' button in the top right corner and follow the wizard. You'll need a valid email address and to choose a secure password. The whole process takes less than 2 minutes!"
            />
            <TreeView
              title="What are the system requirements?"
              isFile 
              answer="Our platform works on all modern browsers including Chrome, Firefox, Safari and Edge. We recommend having at least 4GB RAM and a stable internet connection."
            />
            <TreeView
              title="Is there a mobile app available?"
              isFile
              answer="Yes! We have mobile apps for both iOS and Android devices. You can download them from the respective app stores."
            />
          </TreeView>

          <TreeView defaultValue={false} title="Account Management">
            <TreeView
              title="How do I reset my password?"
              isFile
              answer="Click 'Forgot Password' on the login page and enter your email address. We'll send you instructions to reset your password."
            />
            <TreeView
              title="Can I change my username?"
              isFile
              answer="Yes, you can change your username once every 30 days from the Account Settings page."
            />
            <TreeView
              title="How do I delete my account?"
              isFile
              answer="Go to Account Settings > Delete Account. Please note this action is permanent and cannot be undone."
            />
          </TreeView>

          <TreeView defaultValue={false} title="Billing & Subscriptions">
            <TreeView
              title="What payment methods do you accept?"
              isFile
              answer="We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers in select countries."
            />
            <TreeView
              title="How do refunds work?"
              isFile
              answer="Refund requests can be submitted within 30 days of purchase. Each case is reviewed individually within 2-3 business days."
            />
            <TreeView
              title="Can I upgrade/downgrade my plan?"
              isFile
              answer="Yes, you can change your plan at any time. The billing will be prorated automatically."
            />
          </TreeView>

          <TreeView defaultValue={false} title="Security">
            <TreeView
              title="Is my data secure?"
              isFile
              answer="Yes, we use industry-standard encryption and security measures. All data is encrypted both in transit and at rest."
            />
            <TreeView
              title="Do you support two-factor authentication?"
              isFile
              answer="Yes, we strongly recommend enabling 2FA through authenticator apps or SMS for additional security."
            />
            <TreeView
              title="How often do you backup data?"
              isFile
              answer="We perform automated backups every 6 hours and maintain redundant copies across multiple secure locations."
            />
          </TreeView>

          <TreeView defaultValue={false} title="Technical Support">
            <TreeView
              title="What are your support hours?"
              isFile
              answer="Our support team is available 24/7 via email. Phone support is available Monday-Friday, 9AM-5PM EST."
            />
            <TreeView
              title="How do I report a bug?"
              isFile
              answer="Use the 'Report Issue' button in the help menu or email support@example.com with details about the bug."
            />
            <TreeView
              title="Is there an API available?"
              isFile
              answer="Yes, we offer a RESTful API for developers. Documentation is available in our Developer Portal."
            />
          </TreeView>

          <TreeView defaultValue={false} title="Privacy">
            <TreeView
              title="How is my personal information used?"
              isFile
              answer="We only use your information as described in our Privacy Policy. We never sell your data to third parties."
            />
            <TreeView
              title="Can I export my data?"
              isFile
              answer="Yes, you can request a full export of your data at any time through the Account Settings page."
            />
            <TreeView
              title="How long do you retain data?"
              isFile
              answer="We retain active account data indefinitely. Deleted account data is removed within 30 days."
            />
          </TreeView>

          <TreeView defaultValue={false} title="Miscellaneous">
            <TreeView
              title="Do you offer educational discounts?"
              isFile
              answer="Yes, we offer special pricing for students and educational institutions. Contact our sales team for details."
            />
            <TreeView
              title="Is there a limit on storage?"
              isFile
              answer="Free accounts have 5GB storage. Premium plans start at 100GB and go up to unlimited storage."
            />
            <TreeView
              title="What languages do you support?"
              isFile
              answer="Our platform is available in English, Spanish, French, German, Japanese, and Chinese."
            />
          </TreeView>
        </TreeView>
      </Card>
    </>
  );
}

// ... existing code ...