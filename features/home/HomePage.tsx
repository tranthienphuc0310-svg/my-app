import {
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* ================= Navbar ================= */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-center px-6">
          <h1 className="text-2xl font-bold text-indigo-600">ShopEase</h1>
        </div>
      </header>

      {/* ================= Hero ================= */}
      <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2">
        <div>
          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700">
            ✨ Trusted by 10,000+ customers
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight text-gray-900 lg:text-6xl">
            Discover premium
            <span className="text-indigo-600"> products </span>
            with confidence.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
            ShopEase helps you discover quality products from trusted brands
            with a fast, secure and enjoyable shopping experience.
          </p>

          <div className="mt-10 flex gap-4">
            <Button size="lg">
              Explore Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>

        {/* Hero Card */}
        <div className="flex justify-center">
          <Card className="w-full max-w-lg rounded-3xl border-0 shadow-2xl">
            <CardContent className="space-y-8 p-10">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-100">
                <ShoppingBag className="h-10 w-10 text-indigo-600" />
              </div>

              <div>
                <h2 className="text-3xl font-bold">Everything in one place</h2>

                <p className="mt-3 text-gray-600">
                  Discover thousands of carefully selected products with fast
                  delivery and secure checkout.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-100 p-5">
                  <Users className="mb-3 text-indigo-600" />
                  <h3 className="text-2xl font-bold">10K+</h3>
                  <p className="text-sm text-gray-500">Happy Customers</p>
                </div>

                <div className="rounded-2xl bg-slate-100 p-5">
                  <ShoppingBag className="mb-3 text-indigo-600" />
                  <h3 className="text-2xl font-bold">5K+</h3>
                  <p className="text-sm text-gray-500">Products</p>
                </div>

                <div className="rounded-2xl bg-slate-100 p-5">
                  <Truck className="mb-3 text-indigo-600" />
                  <h3 className="text-2xl font-bold">24h</h3>
                  <p className="text-sm text-gray-500">Fast Delivery</p>
                </div>

                <div className="rounded-2xl bg-slate-100 p-5">
                  <ShieldCheck className="mb-3 text-indigo-600" />
                  <h3 className="text-2xl font-bold">100%</h3>
                  <p className="text-sm text-gray-500">Secure Payment</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ================= Features ================= */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">Why choose ShopEase?</h2>

          <p className="mt-3 text-gray-500">
            Everything you need for a modern shopping experience.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Fast Delivery",
              text: "Receive your orders quickly and safely.",
              icon: Truck,
            },
            {
              title: "Secure Payment",
              text: "Your payment information is always protected.",
              icon: ShieldCheck,
            },
            {
              title: "Premium Products",
              text: "Only trusted brands and high quality items.",
              icon: ShoppingBag,
            },
          ].map((item) => (
            <Card
              key={item.title}
              className="rounded-3xl transition hover:-translate-y-2 hover:shadow-xl"
            >
              <CardContent className="space-y-4 p-8">
                <item.icon className="h-10 w-10 text-indigo-600" />

                <h3 className="text-xl font-semibold">{item.title}</h3>

                <p className="text-gray-600">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
