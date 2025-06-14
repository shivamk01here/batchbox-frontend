import React from 'react';

const HelpPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">📘 Help & Support</h1>

      {/* Section 1 */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">1. Getting Started</h2>
        <p className="text-gray-600">
          Welcome to BatchBox! This platform helps you manage your institute efficiently.
          To begin, add your institute details under <strong>Settings</strong>, and start creating your first batch from the <strong>Dashboard</strong>.
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">2. Creating and Managing Batches</h2>
        <p className="text-gray-600">
          Go to the <strong>Batches</strong> section to create a new batch. You can assign subjects, faculty, and timing. Edit or archive batches anytime.
          Use color coding and tags to organize multiple batches easily.
        </p>
      </section>

      {/* Section 3 */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">3. Taking Attendance</h2>
        <p className="text-gray-600">
          Visit the <strong>Attendance</strong> tab, select the batch and date, and mark present/absent for each student. Export attendance reports in one click.
        </p>
      </section>

      {/* Section 4 */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">4. Uploading Results</h2>
        <p className="text-gray-600">
          Navigate to <strong>Results</strong>, choose the batch and exam, and upload marks. You can import via Excel or enter them manually. Parents will get notified automatically.
        </p>
      </section>

      {/* Section 5 */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">5. Communicating with Students & Parents</h2>
        <p className="text-gray-600">
          Use the <strong>Communication</strong> tab to send announcements, reminders, and updates via SMS, WhatsApp, or Email. You can create templates for faster outreach.
        </p>
      </section>

      {/* Section 6 */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">6. Fees & Payments</h2>
        <p className="text-gray-600">
          Manage fee structures, generate receipts, and track pending dues under the <strong>Fees</strong> section. You can enable reminders and offer custom discounts.
        </p>
      </section>

      {/* Section 7 */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">7. Customizing Your Dashboard</h2>
        <p className="text-gray-600">
          Every user (admin, faculty, or staff) sees a personalized dashboard. You can rearrange widgets and track KPIs like attendance trends, upcoming classes, and fee recovery.
        </p>
      </section>

      {/* Support */}
      <section className="mt-8 p-4 bg-blue-50 rounded-md">
        <p className="text-gray-700">
          Still need help? Reach us at <strong>support@batchbox.in</strong> or message our support bot from the bottom right corner anytime.
        </p>
      </section>
    </div>
  );
};

export default HelpPage;
