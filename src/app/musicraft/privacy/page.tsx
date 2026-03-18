import MusicraftNav from '../components/MusicraftNav';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ fontFamily: 'Manrope, sans-serif', color: '#E8E8F0' }}>
      <div className="relative" style={{ zIndex: 1 }}>
        <MusicraftNav />

        {/* Page Header */}
        <div className="pt-24 pb-10 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ background: 'linear-gradient(135deg, #A78BFA, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Privacy Policy
            </h1>
          </div>
        </div>

        {/* Document Body */}
        <div className="px-6 pb-16">
          <div className="max-w-3xl mx-auto">

            {/* Intro */}
            <div className="mb-10">
              <p className="text-base leading-relaxed mb-4" style={{ color: 'rgba(232,232,240,0.75)' }}>
                This Privacy Policy explains how Musicraft collects, uses and protects personal data when you use the website or contact us.
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.75)' }}>
                Musicraft is operated by GREAT VIZIER ENTERTAINMENT s.r.o., Ri&#382;sk&#225; 1580/7, 102 00 Prague 10, Czech Republic.
              </p>
            </div>

            {/* Section 1 */}
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-4" style={{ color: '#E8E8F0' }}>SECTION 1 &mdash; Data Controller</h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'rgba(232,232,240,0.75)' }}>The controller of personal data is:</p>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'rgba(232,232,240,0.75)' }}>
                GREAT VIZIER ENTERTAINMENT s.r.o.<br />
                Ri&#382;sk&#225; 1580/7<br />
                102 00 Prague 10<br />
                Czech Republic
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.75)' }}>
                Contact email:{' '}
                <a href="mailto:support@musicraft.eu" style={{ color: '#A78BFA' }}>support@musicraft.eu</a>
              </p>
            </div>

            {/* Section 2 */}
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-4" style={{ color: '#E8E8F0' }}>SECTION 2 &mdash; Data We Collect</h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'rgba(232,232,240,0.75)' }}>Musicraft may collect the following information:</p>
              <ul className="space-y-2" style={{ color: 'rgba(232,232,240,0.75)' }}>
                {[
                  'name and contact details',
                  'email addresses submitted through contact or application forms',
                  'information related to distribution applications',
                  'technical data such as IP address, browser type and device information',
                ]?.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'rgba(167,139,250,0.6)' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 3 */}
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-4" style={{ color: '#E8E8F0' }}>SECTION 3 &mdash; How We Use Personal Data</h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'rgba(232,232,240,0.75)' }}>Personal data may be used for the following purposes:</p>
              <ul className="space-y-2" style={{ color: 'rgba(232,232,240,0.75)' }}>
                {[
                  'responding to inquiries',
                  'reviewing distribution applications',
                  'providing support',
                  'improving website functionality',
                  'complying with legal obligations',
                ]?.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'rgba(167,139,250,0.6)' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 4 */}
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-4" style={{ color: '#E8E8F0' }}>SECTION 4 &mdash; Legal Basis</h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'rgba(232,232,240,0.75)' }}>Processing of personal data is based on:</p>
              <ul className="space-y-2" style={{ color: 'rgba(232,232,240,0.75)' }}>
                {[
                  'legitimate interest',
                  'contractual necessity when providing services',
                  'legal obligations',
                ]?.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'rgba(167,139,250,0.6)' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 5 */}
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-4" style={{ color: '#E8E8F0' }}>SECTION 5 &mdash; Data Sharing</h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'rgba(232,232,240,0.75)' }}>Musicraft does not sell personal data.</p>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'rgba(232,232,240,0.75)' }}>Data may be shared only with:</p>
              <ul className="space-y-2" style={{ color: 'rgba(232,232,240,0.75)' }}>
                {[
                  'service providers necessary to operate the website',
                  'digital distribution partners where required to deliver services',
                  'authorities where required by law',
                ]?.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'rgba(167,139,250,0.6)' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 6 */}
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-4" style={{ color: '#E8E8F0' }}>SECTION 6 &mdash; Data Retention</h2>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.75)' }}>
                Personal data is retained only for the period necessary to provide services or comply with legal obligations.
              </p>
            </div>

            {/* Section 7 */}
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-4" style={{ color: '#E8E8F0' }}>SECTION 7 &mdash; User Rights</h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'rgba(232,232,240,0.75)' }}>Users located in the European Union have the right to:</p>
              <ul className="space-y-2 mb-4" style={{ color: 'rgba(232,232,240,0.75)' }}>
                {[
                  'request access to their personal data',
                  'request correction of inaccurate data',
                  'request deletion of personal data',
                  'object to certain types of processing',
                ]?.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'rgba(167,139,250,0.6)' }} />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.75)' }}>
                Requests may be sent to:{' '}
                <a href="mailto:support@musicraft.eu" style={{ color: '#A78BFA' }}>support@musicraft.eu</a>
              </p>
            </div>

            {/* Section 8 */}
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-4" style={{ color: '#E8E8F0' }}>SECTION 8 &mdash; Cookies</h2>
              <p className="text-base leading-relaxed mb-3" style={{ color: 'rgba(232,232,240,0.75)' }}>
                The website may use cookies or similar technologies to improve functionality and analyze usage.
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.75)' }}>
                Users may control cookies through their browser settings.
              </p>
            </div>

            {/* Section 9 */}
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-4" style={{ color: '#E8E8F0' }}>SECTION 9 &mdash; Security</h2>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.75)' }}>
                Musicraft takes reasonable technical and organizational measures to protect personal data against unauthorized access or misuse.
              </p>
            </div>

            {/* Section 10 */}
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-4" style={{ color: '#E8E8F0' }}>SECTION 10 &mdash; Changes to This Policy</h2>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.75)' }}>
                Musicraft may update this Privacy Policy from time to time.
              </p>
            </div>

            {/* Section 11 */}
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-4" style={{ color: '#E8E8F0' }}>SECTION 11 &mdash; Contact</h2>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.75)' }}>
                For any privacy-related inquiries, please contact:{' '}
                <a href="mailto:support@musicraft.eu" style={{ color: '#A78BFA' }}>support@musicraft.eu</a>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
