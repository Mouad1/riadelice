"use client";

import { useState } from "react";
import { CalendarDays, Clock, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

export default function ReservationsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    partySize: "2",
    specialRequests: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to store/API
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
                  <div className="space-y-1">
                    <label htmlFor="partySize" className="block text-sm font-medium text-dark-200">
                      Party Size
                    </label>
                    <div className="flex items-center gap-2">
                      <Users size={18} className="text-dark-400 shrink-0" />
                      <select
                        id="partySize"
                        value={form.partySize}
                        onChange={(e) => setForm({ ...form, partySize: e.target.value })}
                        className="flex-1 rounded-lg border border-dark-600 bg-dark-800 px-4 py-2.5 text-dark-50 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                      >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? "Guest" : "Guests"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Date"
                    id="date"
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                  <div className="space-y-1">
                    <label htmlFor="time" className="block text-sm font-medium text-dark-200">
                      Time
                    </label>
                    <div className="flex items-center gap-2">
                      <Clock size={18} className="text-dark-400 shrink-0" />
                      <select
                        id="time"
                        value={form.time}
                        onChange={(e) => setForm({ ...form, time: e.target.value })}
                        className="flex-1 rounded-lg border border-dark-600 bg-dark-800 px-4 py-2.5 text-dark-50 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                        required
                      >
                        <option value="">Select time</option>
                        {[
                          "11:30", "12:00", "12:30", "13:00", "13:30",
                          "17:00", "17:30", "18:00", "18:30", "19:00",
                          "19:30", "20:00", "20:30", "21:00",
                        ].map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
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
