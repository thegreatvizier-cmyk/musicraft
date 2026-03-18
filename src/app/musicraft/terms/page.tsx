import MusicraftNav from '../components/MusicraftNav';

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ fontFamily: 'Manrope, sans-serif', color: '#E8E8F0' }}>
      <div className="relative" style={{ zIndex: 1 }}>
        <MusicraftNav />

        {/* Page Header */}
        <div className="pt-24 pb-10 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ background: 'linear-gradient(135deg, #A78BFA, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Terms of Service
            </h1>
            <p className="text-sm" style={{ color: 'rgba(232,232,240,0.45)' }}>Effective date: 1 January 2026 &nbsp;·&nbsp; Last updated: 31 January 2026</p>
          </div>
        </div>

        {/* Document Body */}
        <div className="px-6 pb-16">
          <div className="max-w-3xl mx-auto">

            {/* Intro */}
            <div className="mb-10">
              <p className="text-base leading-relaxed mb-4" style={{ color: 'rgba(232,232,240,0.75)' }}>
                These Terms of Use (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you (&ldquo;User&rdquo;, &ldquo;you&rdquo;) and GREAT VIZIER ENTERTAINMENT s.r.o., Rižská 1580/7, 102 00 Prague 10, Czech Republic, operating under the brand MUSICRAFT (&ldquo;MUSICRAFT&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;).
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.75)' }}>
                By accessing or using the Services, you confirm that you have read, understood and agreed to be bound by these Terms.
              </p>
            </div>

            {/* Section 1 */}
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-5" style={{ color: '#E8E8F0' }}>1. DEFINITIONS</h2>
              <div className="space-y-4">
                {[
                  ['&ldquo;Platform&rdquo;', 'means the technical infrastructure, systems and interfaces operated by MUSICRAFT to provide the Services, including any dashboards, tools or interfaces made available to specific User roles.'],
                  ['&ldquo;Platform Interface&rdquo;', 'means any dashboard or user interface of the Platform made available exclusively to approved Label Users for content and account management purposes.'],
                  ['&ldquo;Services&rdquo;', 'means the digital distribution, hosting, processing, delivery, reporting and related technical services provided by MUSICRAFT.'],
                  ['&ldquo;User&rdquo; or &ldquo;End User&rdquo;', 'means any natural or legal person who accepts these Terms.'],
                  ['&ldquo;Artist User&rdquo;', 'means a User who distributes exclusively content in which they control the relevant rights and who does not manage third-party catalogues.'],
                  ['&ldquo;Label User&rdquo;', 'means a User who distributes content of multiple artists and/or rightsholders and who has been granted label-level access by MUSICRAFT.'],
                  ['&ldquo;White-Label Access&rdquo;', 'means restricted functionality allowing approved Label Users to manage sub-accounts, catalogues, releases and metadata of third parties.'],
                  ['&ldquo;End User Content&rdquo;', 'means any audio recordings, audiovisual recordings, musical works, artwork, metadata, texts, images or other materials provided by the User.'],
                  ['&ldquo;Digital Service Providers&rdquo; or &ldquo;DSPs&rdquo;', 'means digital music services including streaming services, download stores, social media platforms, UGC platforms and similar services.'],
                  ['&ldquo;Net Revenue&rdquo;', 'means revenue actually received by MUSICRAFT from DSPs in connection with End User Content, after deduction of taxes, fees, refunds, chargebacks and third-party costs.'],
                  ['&ldquo;Territory&rdquo;', 'means the world, subject to rights, metadata and DSP restrictions.'],
                ]?.map(([term, def], i) => (
                  <p key={i} className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.75)' }}>
                    <span className="font-semibold" style={{ color: '#E8E8F0' }} dangerouslySetInnerHTML={{ __html: term }} />{' '}
                    <span dangerouslySetInnerHTML={{ __html: def }} />
                  </p>
                ))}
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-5" style={{ color: '#E8E8F0' }}>2. SCOPE OF SERVICES</h2>
              <div className="space-y-4">
                <p className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.75)' }}>
                  <span className="font-semibold" style={{ color: '#E8E8F0' }}>2.1</span> MUSICRAFT provides a technical service enabling Users to distribute End User Content to selected DSPs, manage releases, access reports and receive revenues generated by such exploitation.
                </p>
                <div>
                  <p className="text-base leading-relaxed mb-2" style={{ color: 'rgba(232,232,240,0.75)' }}>
                    <span className="font-semibold" style={{ color: '#E8E8F0' }}>2.2</span> MUSICRAFT does not guarantee:
                  </p>
                  <ul className="ml-6 space-y-1" style={{ color: 'rgba(232,232,240,0.75)' }}>
                    <li className="text-base leading-relaxed list-disc">acceptance of End User Content by any DSP;</li>
                    <li className="text-base leading-relaxed list-disc">availability on any specific DSP;</li>
                    <li className="text-base leading-relaxed list-disc">any level of streams, sales or revenue;</li>
                    <li className="text-base leading-relaxed list-disc">immediate takedown or modification on DSPs.</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.75)' }}>
                  <span className="font-semibold" style={{ color: '#E8E8F0' }}>2.3</span> The Services are provided on a standard, non-customised basis and are not designed to meet any specific commercial or technical requirements of the User.
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.75)' }}>
                  <span className="font-semibold" style={{ color: '#E8E8F0' }}>2.4</span> Promotional, marketing or label services are provided only if expressly agreed in a separate written agreement. 
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-5" style={{ color: '#E8E8F0' }}>3. ACCOUNT REGISTRATION AND USE OF SERVICES</h2>
              <div className="space-y-4">
                <p className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.75)' }}>
                  <span className="font-semibold" style={{ color: '#E8E8F0' }}>3.1 Access to the Services</span> — In order to use the Services, the User must provide the information reasonably required by MUSICRAFT to perform digital distribution and related services. Depending on the User&apos;s role, access to the Services may be provided: (a) through direct communication with MUSICRAFT; and/or (b) through an online account or interface made available by MUSICRAFT. Artist Users are not required to access or use any platform dashboard or interface unless expressly made available to them.
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.75)' }}>
                  <span className="font-semibold" style={{ color: '#E8E8F0' }}>3.2 Responsibility for Information and Credentials</span> — Where an online account or interface is made available, the User shall ensure that all registration information is complete, accurate and up to date. The User is solely responsible for safeguarding credentials, all activities performed using those credentials and any unauthorised access resulting from their failure to secure them.
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.75)' }}>
                  <span className="font-semibold" style={{ color: '#E8E8F0' }}>3.3 Use of Services (All Users)</span> — Users shall not use the Services unlawfully or fraudulently, upload content in breach of these Terms, interfere with the integrity of the Services or circumvent technical or security measures.
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.75)' }}>
                  <span className="font-semibold" style={{ color: '#E8E8F0' }}>3.4 Platform Interface and Label Access</span> — Access to the Platform Interface is provided exclusively to approved Label Users. MUSICRAFT may grant, limit or revoke such access at its sole discretion.
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.75)' }}>
                  <span className="font-semibold" style={{ color: '#E8E8F0' }}>3.5 White-Label Access</span> — White-Label Access is available only to approved Label Users, is not available to Artist Users and does not grant ownership or sublicensing rights. Label Users remain fully responsible for all sub-accounts and content uploaded through White-Label Access.
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.75)' }}>
                  <span className="font-semibold" style={{ color: '#E8E8F0' }}>3.6 Prohibited Platform Activities (Label Users)</span> — Label Users shall not grant unauthorised third-party access, reverse engineer or scrape the Platform, replicate its functionality or misuse Platform Interfaces.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-5" style={{ color: '#E8E8F0' }}>4. GRANT OF RIGHTS</h2>
              <div className="space-y-4">
                <p className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.75)' }}>
                  <span className="font-semibold" style={{ color: '#E8E8F0' }}>4.1</span> The User grants MUSICRAFT a licence to use End User Content strictly as necessary to provide the Services, including hosting, encoding, delivery, reproduction, fingerprinting and reporting.
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.75)' }}>
                  <span className="font-semibold" style={{ color: '#E8E8F0' }}>4.2</span> The licence is non-exclusive except where exclusivity is required per DSP.
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.75)' }}>
                  <span className="font-semibold" style={{ color: '#E8E8F0' }}>4.3</span> The User shall not distribute the same content to the same DSP through another provider during the same period and territory.
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.75)' }}>
                  <span className="font-semibold" style={{ color: '#E8E8F0' }}>4.4</span> All rights not expressly granted remain with the User.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-5" style={{ color: '#E8E8F0' }}>5. USER WARRANTIES AND OBLIGATIONS</h2>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.75)' }}>
                The User warrants that they own or control all necessary rights, have obtained all publishing and third-party clearances, provide accurate metadata and comply with applicable laws and DSP policies. 
              </p>
            </div>

            {/* Section 6 */}
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-5" style={{ color: '#E8E8F0' }}>6. CONTENT RESTRICTIONS AND TAKEDOWN</h2>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.75)' }}>
                MUSICRAFT may suspend, remove or refuse content that is unlawful, infringing or non-compliant. DSPs control final availability and immediate takedown is not guaranteed.
              </p>
            </div>

            {/* Section 7 */}
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-5" style={{ color: '#E8E8F0' }}>7. FEES, REVENUE AND PAYOUTS</h2>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.75)' }}>
                Net Revenue shall be payable to Client in accordance with the payment terms, minimum payout threshold, reporting cycles, payment timing and permitted deductions as set forth in the Terms of Use. Client acknowledges that payments shall only be made once the applicable minimum payout threshold, as defined in the Terms of Use, has been reached. Client further acknowledges that reports and payouts may be revised or adjusted retrospectively to reflect corrections, refunds, chargebacks or amended reports received from DSPs.
              </p>
            </div>

            {/* Section 8 */}
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-5" style={{ color: '#E8E8F0' }}>8. FRAUD AND ABUSE</h2>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.75)' }}>
                In cases of suspected fraud, MUSICRAFT may withhold payouts for up to twenty-four (24) months, reverse or claw back amounts and terminate these Terms immediately.
              </p>
            </div>

            {/* Section 9 */}
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-5" style={{ color: '#E8E8F0' }}>9. INTELLECTUAL PROPERTY</h2>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.75)' }}>
                Users retain ownership of End User Content. All Platform technology remains the exclusive property of MUSICRAFT.
              </p>
            </div>

            {/* Section 10 */}
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-5" style={{ color: '#E8E8F0' }}>10. DISCLAIMER AND LIMITATION OF LIABILITY</h2>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.75)' }}>
                The Services are provided &ldquo;as is&rdquo;. MUSICRAFT shall not be liable for indirect damages, DSP failures or loss of profits. Aggregate liability shall not exceed fees paid in the six (6) months preceding the claim.
              </p>
            </div>

            {/* Section 11 */}
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-5" style={{ color: '#E8E8F0' }}>11. TERM AND TERMINATION</h2>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.75)' }}>
                These Terms apply until terminated. Termination requires settlement of balances and completion of takedown requests. Certain obligations survive termination.
              </p>
            </div>

            {/* Section 12 */}
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-5" style={{ color: '#E8E8F0' }}>12. GOVERNING LAW AND FINAL PROVISIONS</h2>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.75)' }}>
                These Terms are governed by the laws of the Czech Republic. Jurisdiction lies exclusively with the courts of Prague, Czech Republic. Electronic acceptance constitutes a binding agreement.
              </p>
            </div>

            {/* Footer note */}
            <div className="pt-8 mt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-sm text-center" style={{ color: 'rgba(232,232,240,0.35)' }}>
                &copy; 2026 GREAT VIZIER ENTERTAINMENT s.r.o. All rights reserved.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
