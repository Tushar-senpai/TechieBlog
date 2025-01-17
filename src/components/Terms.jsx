import React from 'react';

function Terms() {
  return (
    <div className="container mx-auto p-10 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-5 text-center text-orange-600">Terms and Conditions</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">Table of Contents</h2>
        <ul className="list-none pl-5 space-y-2">
          <li><a href="#terms" className="text-primary dark:text-orange-400 hover:underline text-lg">Terms</a></li>
          <li><a href="#disclaimer" className="text-primary dark:text-orange-400 hover:underline text-lg">Disclaimer</a></li>
          <li><a href="#limitations" className="text-primary dark:text-orange-400 hover:underline text-lg">Limitations</a></li>
          <li><a href="#accuracy" className="text-primary dark:text-orange-400 hover:underline text-lg">Accuracy of Materials</a></li>
          <li><a href="#links" className="text-primary dark:text-orange-400 hover:underline text-lg">Links</a></li>
          <li><a href="#modifications" className="text-primary dark:text-orange-400 hover:underline text-lg">Modifications</a></li>
          <li><a href="#governing-law" className="text-primary dark:text-orange-400 hover:underline text-lg">Governing Law</a></li>
        </ul>
      </div>
      
      <p className="mb-8 text-gray-700 dark:text-gray-300">Welcome to TechieBlog, accessible at techieblog.com. By accessing and using this Blog, you agree to comply with and be bound by the following Terms and conditions. Please read them carefully.</p>

      <div id="terms" className="mb-8">
        <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100">1. Terms</h2>
        <p className="text-gray-700 dark:text-gray-300">By accessing this website, you agree to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
      </div>

      <div id="disclaimer" className="mb-8">
        <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100">2. Disclaimer</h2>
        <p className="text-gray-700 dark:text-gray-300">The materials on TechieBlog's website are provided on an 'as is' basis. TechieBlog makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
        <p className="text-gray-700 dark:text-gray-300">Further, TechieBlog does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.</p>
      </div>

      <div id="limitations" className="mb-8">
        <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100">3. Limitations</h2>
        <p className="text-gray-700 dark:text-gray-300">In no event shall TechieBlog or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on TechieBlog's website, even if TechieBlog or a TechieBlog authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.</p>
      </div>

      <div id="accuracy" className="mb-8">
        <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100">4. Accuracy of Materials</h2>
        <p className="text-gray-700 dark:text-gray-300">The materials appearing on TechieBlog's website could include technical, typographical, or photographic errors. TechieBlog does not warrant that any of the materials on its website are accurate, complete or current. TechieBlog may make changes to the materials contained on its website at any time without notice. However, TechieBlog does not make any commitment to update the materials.</p>
      </div>

      <div id="links" className="mb-8">
        <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100">5. Links</h2>
        <p className="text-gray-700 dark:text-gray-300">TechieBlog has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by TechieBlog of the site. Use of any such linked website is at the user's own risk.</p>
      </div>

      <div id="modifications" className="mb-8">
        <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100">6. Modifications</h2>
        <p className="text-gray-700 dark:text-gray-300">TechieBlog may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>
      </div>

      <div id="governing-law" className="mb-8">
        <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100">7. Governing Law</h2>
        <p className="text-gray-700 dark:text-gray-300">These terms and conditions are governed by and construed in accordance with the laws of our country and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
      </div>
    </div>
  );
}

export default Terms;
