import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogoModern } from "@/components/logo-modern"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <LogoModern className="h-16 w-16" color="#FFD166" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="button-primary" style={{ backgroundColor: "#FFD166", color: "#1b1b1b" }}>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  )
}
