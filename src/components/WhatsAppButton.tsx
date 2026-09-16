import { trackEvent } from '../lib/analytics'

export function WhatsAppButton() {
  return (
    <>
      <style>
        {`
          .whatsapp-btn {
            position: fixed;
            bottom: 24px;
            right: 24px;
            background-color: #25D366;
            border-radius: 50%;
            padding: 12px;
            box-shadow: 0px 4px 15px rgba(0,0,0,0.3);
            animation: pulse-wa 1.5s infinite;
            z-index: 9999;
            cursor: pointer;
            text-decoration: none;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .whatsapp-btn img {
            width: 36px;
            height: 36px;
            display: block;
          }

          /* Tooltip */
          .whatsapp-btn::before {
            content: "¿Te ayudo?";
            position: absolute;
            right: 70px;
            top: 50%;
            transform: translateY(-50%);
            background-color: #25D366;
            color: white;
            padding: 6px 12px;
            border-radius: 8px;
            opacity: 0;
            white-space: nowrap;
            pointer-events: none;
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
            font-family: 'Inter', sans-serif;
            font-weight: bold;
            font-size: 14px;
            box-shadow: 0px 2px 8px rgba(0,0,0,0.2);
          }

          .whatsapp-btn:hover::before {
            opacity: 1;
            transform: translateY(-50%) translateX(-4px);
          }

          @keyframes pulse-wa {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
            50% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(37, 211, 102, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
          }
        `}
      </style>

      <a 
        href="https://wa.me/5492644127532" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-btn" 
        title="Chatea con nosotros"
        onClick={() => trackEvent('click_whatsapp', { destination: 'soporte_virtual' })}
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
      </a>
    </>
  )
}
