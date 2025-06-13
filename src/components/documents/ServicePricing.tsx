import React, { Component } from 'react';
const ServicePricing: React.FC = () => {
  return <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-green-600 mb-2">
          Project Investment Breakdown
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800">
          DelightfulGroup.africa
        </h2>
        <div className="w-24 h-1 bg-green-600 mx-auto mt-4"></div>
      </div>
      <section className="mb-10">
        <h3 className="text-xl font-bold mb-4 text-green-600 border-b pb-2">
          Web Development Services
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-3 px-4 bg-green-50 border-b text-left">
                  Service Component
                </th>
                <th className="py-3 px-4 bg-green-50 border-b text-left">
                  Description
                </th>
                <th className="py-3 px-4 bg-green-50 border-b text-right">
                  Investment (ZAR)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 px-4 border-b">Website Design</td>
                <td className="py-3 px-4 border-b">
                  Custom responsive design, UI/UX development
                </td>
                <td className="py-3 px-4 border-b text-right">R18,500</td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b">Frontend Development</td>
                <td className="py-3 px-4 border-b">
                  React.js implementation, responsive components
                </td>
                <td className="py-3 px-4 border-b text-right">R25,000</td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b">E-commerce Integration</td>
                <td className="py-3 px-4 border-b">
                  Online shop setup and product management
                </td>
                <td className="py-3 px-4 border-b text-right">R15,000</td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b">Content Management</td>
                <td className="py-3 px-4 border-b">
                  CMS setup and content integration
                </td>
                <td className="py-3 px-4 border-b text-right">R8,500</td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b">Testing & Optimization</td>
                <td className="py-3 px-4 border-b">
                  Performance testing, SEO optimization
                </td>
                <td className="py-3 px-4 border-b text-right">R7,000</td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b font-semibold">Subtotal</td>
                <td className="py-3 px-4 border-b"></td>
                <td className="py-3 px-4 border-b text-right font-semibold">
                  R74,000
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className="mb-10">
        <h3 className="text-xl font-bold mb-4 text-green-600 border-b pb-2">
          Marketing Strategy Development
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-3 px-4 bg-green-50 border-b text-left">
                  Service Component
                </th>
                <th className="py-3 px-4 bg-green-50 border-b text-left">
                  Description
                </th>
                <th className="py-3 px-4 bg-green-50 border-b text-right">
                  Investment (ZAR)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 px-4 border-b">
                  Market Research & Analysis
                </td>
                <td className="py-3 px-4 border-b">
                  Industry analysis, competitor research
                </td>
                <td className="py-3 px-4 border-b text-right">R12,000</td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b">Brand Strategy</td>
                <td className="py-3 px-4 border-b">
                  Positioning, messaging, voice development
                </td>
                <td className="py-3 px-4 border-b text-right">R15,000</td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b">Marketing Plan</td>
                <td className="py-3 px-4 border-b">
                  Channel strategy, campaign planning
                </td>
                <td className="py-3 px-4 border-b text-right">R18,000</td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b">Pricing Strategy</td>
                <td className="py-3 px-4 border-b">
                  Market-based pricing analysis
                </td>
                <td className="py-3 px-4 border-b text-right">R8,000</td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b font-semibold">Subtotal</td>
                <td className="py-3 px-4 border-b"></td>
                <td className="py-3 px-4 border-b text-right font-semibold">
                  R53,000
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className="mb-10">
        <h3 className="text-xl font-bold mb-4 text-green-600 border-b pb-2">
          Future Support & Maintenance Options
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold mb-3">Essential Care</h4>
            <p className="text-3xl font-bold text-green-600 mb-4">
              R2,500<span className="text-sm text-gray-600">/month</span>
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Basic website maintenance
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Security updates
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                5 content updates/month
              </li>
            </ul>
          </div>
          <div className="bg-green-50 p-6 rounded-lg border-2 border-green-500">
            <h4 className="text-lg font-semibold mb-3">Professional Growth</h4>
            <p className="text-3xl font-bold text-green-600 mb-4">
              R5,000<span className="text-sm text-gray-600">/month</span>
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                All Essential Care features
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Monthly performance reports
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                15 content updates/month
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                SEO optimization
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold mb-3">Enterprise Success</h4>
            <p className="text-3xl font-bold text-green-600 mb-4">
              R8,500<span className="text-sm text-gray-600">/month</span>
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                All Professional features
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Priority support
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Unlimited content updates
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Strategic consultations
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="mb-10">
        <h3 className="text-xl font-bold mb-4 text-green-600 border-b pb-2">
          Investment Summary
        </h3>
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Web Development Services</span>
              <span className="font-semibold">R74,000</span>
            </div>
            <div className="flex justify-between">
              <span>Marketing Strategy Development</span>
              <span className="font-semibold">R53,000</span>
            </div>
            <div className="border-t pt-4 flex justify-between">
              <span className="font-bold">Total Investment</span>
              <span className="font-bold text-green-600">R127,000</span>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-10">
        <h3 className="text-xl font-bold mb-4 text-green-600 border-b pb-2">
          Payment Terms
        </h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Payment Schedule</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>50% initial payment to commence work (R63,500)</li>
              <li>25% upon completion of development phase (R31,750)</li>
              <li>25% upon project completion and handover (R31,750)</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Payment Methods</h4>
            <ul className="list-disc pl-6">
              <li>Direct bank transfer</li>
              <li>Credit card payment available (+3.5% processing fee)</li>
            </ul>
          </div>
        </div>
      </section>
      <section>
        <h3 className="text-xl font-bold mb-4 text-green-600 border-b pb-2">
          Terms & Conditions
        </h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>All prices are quoted in South African Rand (ZAR)</li>
          <li>Prices are valid for 30 days from the date of this document</li>
          <li>Monthly support plans require a minimum 3-month commitment</li>
          <li>Additional feature requests will be quoted separately</li>
          <li>All intellectual property rights transfer upon final payment</li>
        </ul>
      </section>
    </div>;
};
export default ServicePricing;