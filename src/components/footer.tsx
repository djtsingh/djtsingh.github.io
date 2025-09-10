export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-secondary mt-12 py-6">
      <div className="container mx-auto text-center text-sm">
        <p>&copy; {currentYear} Daljeet Singh. All Rights Reserved.</p>
        {/* We will add social media icons here later */}
      </div>
    </footer>
  );
}