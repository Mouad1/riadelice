"use client";

import { useState } from "react";
import { CalendarDays, Clock, Users, CheckCircle } from "lucide-react";
import { store } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

const partySizeOptions = Array.from({ length: 12 }, (_, i) => i + 1).map((n) => ({
  value: String(n),
  label: `${n} ${n === 1 ? "Guest" : "Guests"}`,
}));

const timeOptions = [
  { value: "", label: "Select time" },
  ...["11:30", "12:00", "12:30", "13:00", "13:30",
      "17:00", "17:30", "18:00", "18:30", "19:00",
      "19:30", "20:00", "20:30", "21:00"].map((t) => ({ value: t, label: t })),
];

export default function ReservationsPage() {
  const today = new Date().toISOString().split("T")[0];
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    partySize: 2,
    specialRequests: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.addReservation({
      customerName: form.name,
      email: form.email,
      phone: form.phone,
      date: form.date,
      time: form.time,
      partySize: form.partySize,
      specialRequests: form.specialRequests || undefined,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-24 flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full text-center">
          <CardContent className="py-12">
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold text-dark-50 mb-2">
              Reservation Received!
            </h2>
            <p className="text-dark-300 mb-6">
              We&apos;ll confirm your reservation via email shortly.
            </p>
            <Button onClick={() => setSubmitted(false)}>Make Another Reservation</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <p className="text-primary-400 font-medium tracking-widest uppercase mb-2">
            Book a Table
          </p>
          <h1 className="font-display text-5xl font-bold text-dark-50 mb-4">
            Make a Reservation
          </h1>
          <p className="text-dark-300 max-w-xl mx-auto">
            Secure your spot for an unforgettable dining experience
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-dark-50">Reservation Details</h2>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    id="name"
                    placeholder="John Smith"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <Input
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Phone"
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                  <Select
                    label="Party Size"
                    id="partySize"
                    icon={Users}
                    options={partySizeOptions}
                    value={String(form.partySize)}
                    onChange={(e) => setForm({ ...form, partySize: Number(e.target.value) })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Date"
                    id="date"
                    type="date"
                    min={today}
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                  <Select
                    label="Time"
                    id="time"
                    icon={Clock}
                    options={timeOptions}
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="specialRequests" className="block text-sm font-medium text-dark-200">
                    Special Requests
                  </label>
                  <textarea
                    id="specialRequests"
                    value={form.specialRequests}
                    onChange={(e) => setForm({ ...form, specialRequests: e.target.value })}
                    rows={3}
                    className="w-full rounded-lg border border-dark-600 bg-dark-800 px-4 py-2.5 text-dark-50 placeholder:text-dark-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 resize-none"
                    placeholder="Allergies, celebrations, seating preferences..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <CalendarDays className="mr-2 h-5 w-5" />
                  Reserve Table
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}