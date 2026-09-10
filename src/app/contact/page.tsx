"use client";

import { useState } from "react";
import { Send, MapPin, Phone, Mail } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { restaurant } from "@/data/restaurant";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <p className="text-primary-400 font-medium tracking-widest uppercase mb-2">
            Get in Touch
          </p>
          <h1 className="font-display text-5xl font-bold text-dark-50 mb-4">Contact Us</h1>
          <p className="text-dark-300 max-w-xl mx-auto">
            Have questions? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <Card>
              <CardContent className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-primary-400 mt-1 shrink-0" />
                <div>
                  <h3 className="font-medium text-dark-50 mb-1">Address</h3>
                  <p className="text-dark-400 text-sm">{restaurant.address}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-start gap-4">
                <Phone className="h-5 w-5 text-primary-400 mt-1 shrink-0" />
                <div>
                  <h3 className="font-medium text-dark-50 mb-1">Phone</h3>
                  <p className="text-dark-400 text-sm">{restaurant.phone}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-start gap-4">
                <Mail className="h-5 w-5 text-primary-400 mt-1 shrink-0" />
                <div>
                  <h3 className="font-medium text-dark-50 mb-1">Email</h3>
                  <p className="text-dark-400 text-sm">{restaurant.email}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-dark-50">Send a Message</h2>
              </CardHeader>
              <CardContent>
                {sent ? (
                  <div className="text-center py-12">
                    <p className="text-green-400 text-lg font-medium">Message sent! We&apos;ll get back to you soon.</p>
                    <Button className="mt-4" onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}>
                      Send Another
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Name"
                        id="name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                      <Input
                        label="Email"
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                    <Input
                      label="Subject"
                      id="subject"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    />
                    <div className="space-y-1">
                      <label htmlFor="message" className="block text-sm font-medium text-dark-200">Message</label>
                      <textarea
                        id="message"
                        rows={5}
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full rounded-lg border border-dark-600 bg-dark-800 px-4 py-2.5 text-dark-50 placeholder:text-dark-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 resize-none"
                        placeholder="Your message..."
                      />
                    </div>
                    <Button type="submit" size="lg">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
