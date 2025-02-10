import MinareNavbar from "@/components/layout/minareMarginals/MinareHeader";

export default function MinareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <MinareNavbar />
      <main>{children}</main>
    </div>
  );
}
