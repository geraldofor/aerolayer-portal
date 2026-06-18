import './globals.css';

export const metadata = {
  title: 'AeroLayer Canvas',
  description: 'Laboratório de Interface de Turismo Híbrida',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
