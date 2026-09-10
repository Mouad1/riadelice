import { MapPin, Phone, Mail, Award, Users, Utensils } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { restaurant } from "@/data/restaurant";

export default function AboutPage() {
  const stats = [
    { icon: Award, value: "15+", label: "Years of Excellence" },
    { icon: Users, value: "50k+", label: "Happy Guests" },
    { icon: Utensils, value: "200+", label: "Signature Dishes" },
  ];

  return (
    <div className="py-16">
      <div className="container-custom">
        <div className="text-center mb-16">
          <p className="text-primary-400 font-medium tracking-widest uppercase mb-2">
            Our Story
          </p>
          <h1 className="font-display text-5xl font-bold text-dark-50 mb-6">About Us</h1>
          <p className="text-dark-300 max-w-3xl mx-auto text-lg leading-relaxed">
            {restaurant.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {stats.map((stat) => (
            <Card key={stat.label} className="text-center">
              <CardContent className="py-8">
                <stat.icon className="h-10 w-10 text-primary-400 mx-auto mb-4" />
                <div className="text-4xl font-bold text-dark-50 mb-1">{stat.value}</div>
                <div className="text-dark-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
              <Utensils className="h-8 w-8 text-primary-400" />
            </div>
            <h3 className="font-semibold text-dark-50 mb-2">Farm to Table</h3>
            <p className="text-dark-400 text-sm">
              We partner with local farmers and suppliers to bring you the freshest seasonal ingredients.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-primary-400" />
            </div>
            <h3 className="font-semibold text-dark-50 mb-2">Culinary Excellence</h3>
            <p className="text-dark-400 text-sm">
              Our award-winning chefs bring passion and innovation to every dish they create.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary-400" />
            </div>
            <h3 className="font-semibold text-dark-50 mb-2">Warm Hospitality</h3>
            <p className="text-dark-400 text-sm">
              From the moment you walk in, you&apos;re family. We believe great food starts with great service.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent>
              <h2 className="font-display text-2xl font-bold text-dark-50 mb-6">Hours</h2>
              <div className="space-y-3">
                {restaurant.hours.map((h) => (
                  <div key={h.day} className="flex justify-between text-dark-300">
                    <span>{h.day}</span>
                    <span className="text-dark-100">{h.open} - {h.close}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="font-display text-2xl font-bold text-dark-50 mb-6">Contact</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary-400 mt-0.5 shrink-0" />
                  <span className="text-dark-300">{restaurant.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary-400 shrink-0" />
                  <span className="text-dark-300">{restaurant.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary-400 shrink-0" />
                  <span className="text-dark-300">{restaurant.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
