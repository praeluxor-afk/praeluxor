export default function WhatsappButton() {
  return (
    <a
      href="https://wa.me/393516601603"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Scrivici su WhatsApp"
      className="group"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9999,
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: '#25D366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(37,211,102,0.35)',
        animation: 'whatsapp-pulse 2.4s ease-in-out infinite',
      }}
    >
      {/* Tooltip */}
      <span
        className="pointer-events-none absolute right-[68px] whitespace-nowrap rounded px-2.5 py-1.5 font-sans text-[11px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      >
        Scrivici su WhatsApp
      </span>

      {/* WhatsApp SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="30"
        height="30"
        fill="white"
        aria-hidden="true"
      >
        <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.61 1.832 6.51L4 29l7.703-1.812A11.94 11.94 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.94 9.94 0 0 1-5.168-1.443l-.37-.232-4.573 1.076 1.1-4.458-.246-.384A9.944 9.944 0 0 1 6 15c0-5.523 4.477-10 10-10zm-3.3 5.5c-.22 0-.576.082-.878.41-.302.328-1.153 1.126-1.153 2.746s1.18 3.188 1.346 3.41c.165.22 2.32 3.544 5.62 4.968 2.784 1.198 3.35.96 3.953.9.603-.06 1.944-.795 2.218-1.563.274-.768.274-1.427.192-1.563-.082-.137-.302-.22-.631-.384-.329-.165-1.944-.959-2.246-1.07-.302-.11-.521-.165-.74.165-.219.328-.85 1.07-1.04 1.29-.192.22-.384.247-.713.082-.33-.165-1.39-.512-2.647-1.633-.978-.873-1.638-1.95-1.83-2.28-.192-.328-.02-.506.144-.67.148-.147.33-.384.494-.576.165-.192.22-.329.329-.548.11-.22.055-.412-.027-.576-.082-.165-.74-1.783-1.013-2.44-.27-.648-.544-.56-.74-.57l-.63-.01z" />
      </svg>

      <style>{`
        @keyframes whatsapp-pulse {
          0%, 100% { box-shadow: 0 4px 16px rgba(37,211,102,0.35); }
          50%       { box-shadow: 0 4px 28px rgba(37,211,102,0.65), 0 0 0 8px rgba(37,211,102,0.12); }
        }
      `}</style>
    </a>
  )
}
