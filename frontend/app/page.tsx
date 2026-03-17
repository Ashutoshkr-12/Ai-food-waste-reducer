import { Camera, Sparkles, ChefHat, Users, Leaf, TrendingDown, Award, ArrowRight, CheckCircle2, Star } from 'lucide-react';
import Link from "next/link";
import { Button } from '../components/ui/button';

export default function Home() {

  
  const features = [
    {
      icon: Camera,
      title: 'AI-Powered Scanning',
      description: 'Instantly detect all ingredients with a simple photo',
      linear: 'from-emerald-400 via-green-400 to-teal-400',
      bglinear: 'from-emerald-50 via-green-50 to-teal-50',
      iconBg: 'bg-linear-to-br from-emerald-400 to-green-500'
    },
    {
      icon: Sparkles,
      title: 'Smart Expiration Tracking',
      description: 'Never let food go to waste with intelligent alerts',
      linear: 'from-amber-400 via-orange-400 to-yellow-400',
      bglinear: 'from-amber-50 via-orange-50 to-yellow-50',
      iconBg: 'bg-linear-to-br from-amber-400 to-orange-500'
    },
    {
      icon: ChefHat,
      title: 'Personalized Recipes',
      description: 'Get recipes tailored to what you have',
      linear: 'from-purple-400 via-pink-400 to-rose-400',
      bglinear: 'from-purple-50 via-pink-50 to-rose-50',
      iconBg: 'bg-linear-to-br from-purple-400 to-pink-500'
    },
    {
      icon: Users,
      title: 'Community Powered',
      description: 'Share and discover recipes with food waste warriors',
      linear: 'from-blue-400 via-cyan-400 to-sky-400',
      bglinear: 'from-blue-50 via-cyan-50 to-sky-50',
      iconBg: 'bg-linear-to-br from-blue-400 to-cyan-500'
    }
  ];

  const stats = [
    { value: '85%', label: 'Waste Reduced', icon: TrendingDown, linear: 'from-emerald-500 to-green-600', bglinear: 'from-emerald-50 to-green-100' },
    { value: '50K+', label: 'Active Users', icon: Users, linear: 'from-blue-500 to-cyan-600', bglinear: 'from-blue-50 to-cyan-100' },
    { value: '2M+', label: 'Meals Saved', icon: Award, linear: 'from-amber-500 to-orange-600', bglinear: 'from-amber-50 to-orange-100' }
  ];

  const benefits = [
    { text: 'Save money on groceries', linear: 'from-emerald-500 to-green-600' },
    { text: 'Reduce environmental impact', linear: 'from-blue-500 to-cyan-600' },
    { text: 'Discover new recipes daily', linear: 'from-purple-500 to-pink-600' },
    { text: 'Track your sustainability journey', linear: 'from-amber-500 to-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Hero Section */}
      <section className="relative px-4 pt-16 pb-24 overflow-hidden">
        {/* Beautiful linear orbs */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-linear-to-br from-emerald-200 to-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40" />
          <div className="absolute top-40 right-0 w-96 h-96 bg-linear-to-br from-teal-200 to-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40" />
          <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-linear-to-br from-lime-200 to-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
        </div>

        <div className="max-w-md mx-auto relative z-10">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-emerald-400 to-green-500 text-white rounded-full text-sm mb-6 shadow-lg">
              <Sparkles className="w-4 h-4" />
              <span className="font-semibold">Powered by AI</span>
            </div>
            
            <h1 className="text-6xl font-bold mb-4">
              <span className="bg-linear-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                FridgeWise
              </span>
            </h1>
            
            <p className="text-2xl font-semibold bg-linear-to-r from-emerald-700 to-green-700 bg-clip-text text-transparent mb-3">
              Reduce Food Waste with AI
            </p>
            
            <p className="text-gray-600 mb-10 max-w-sm mx-auto text-lg leading-relaxed">
              Scan your fridge, discover personalized recipes, and join thousands making a sustainable impact
            </p>

            {/* Hero Image */}
            <div className="relative mb-10">
              <div className="absolute inset-0 bg-linear-to-br from-emerald-400 to-green-500 rounded-[2.5rem] blur-2xl opacity-30" />
              <div className="relative h-80 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1737363625921-dd9e02b4c067?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG9yZ2FuaWMlMjB2ZWdldGFibGVzJTIwcmVmcmlnZXJhdG9yfGVufDF8fHx8MTc3MzI2MjMwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Fresh vegetables in refrigerator"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-5 -left-3 bg-[#FFFCF8] rounded-[1.5rem] shadow-2xl p-4 border-4 border-emerald-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-lg">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-500 font-medium">Impact</div>
                    <div className="text-lg font-bold bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">15kg Saved</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4">
              <Link href="/sign-up">
                <Button className="w-full h-16 text-lg font-bold bg-linear-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 text-white rounded-[1.5rem] shadow-xl">
                  <Camera className="w-6 h-6 mr-2" />
                  Get Started Free
                  <ArrowRight className="w-6 h-6 ml-2" />
                </Button>
              </Link>
              <Link href="/recipe-suggestions">
                <Button variant="outline" className="w-full h-16 text-lg font-bold border-3 bg-[#FFFCF8]/80 backdrop-blur-sm border-emerald-300 text-emerald-700 hover:bg-emerald-50 rounded-[1.5rem] shadow-lg">
                  <Sparkles className="w-6 h-6 mr-2" />
                  Explore Recipes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-20 bg-[#FFFCF8]">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
              Everything You Need
            </h2>
            <p className="text-gray-600 text-lg">
              Powerful features to help you reduce food waste
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-5">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`relative bg-linear-to-br ${feature.bglinear} rounded-[2rem] p-7 border-2 border-white shadow-xl overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-white/60 to-transparent rounded-full blur-2xl" />
                <div className="relative flex items-start gap-5">
                  <div className={`w-16 h-16 rounded-[1.25rem] ${feature.iconBg} flex items-center justify-center shrink-0 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2 text-xl">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-20 bg-linear-to-br from-sky-50 via-cyan-50 to-teal-50 relative overflow-hidden">
        {/* linear orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-linear-to-br from-sky-200 to-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-linear-to-br from-teal-200 to-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
        </div>
        
        <div className="max-w-md mx-auto relative z-10">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
              Why Choose FridgeWise?
            </h2>
            <p className="text-gray-600 text-lg">
              Join the movement towards sustainable living
            </p>
          </div>

          <div className="grid gap-4 mb-12">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-[#FFFCF8]/90 backdrop-blur-sm rounded-[1.5rem] p-5 shadow-lg border-2 border-[#FFFCF8]"
              >
                <div className={`w-12 h-12 rounded-2xl bg-linear-to-br ${benefit.linear} flex items-center justify-center shrink-0 shadow-lg`}>
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-gray-900 font-semibold text-lg">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`bg-linear-to-br ${stat.bglinear} rounded-[2rem] p-6 text-center shadow-xl border-2 border-white`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${stat.linear} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className={`text-4xl font-bold bg-linear-to-br ${stat.linear} bg-clip-text text-transparent mb-2`}>{stat.value}</div>
                <div className="text-sm text-gray-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-20 bg-[#FFFCF8]">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
              Loved by Thousands
            </h2>
            <p className="text-gray-600 text-lg">
              See what our community is saying
            </p>
          </div>
          
          <div className="space-y-5">
            <div className="bg-linear-to-br from-emerald-50 via-green-50 to-teal-50 rounded-[2rem] p-7 border-2 border-emerald-100 shadow-xl">
              <div className="flex items-center gap-4 mb-5">
                <img
                  src="https://images.unsplash.com/photo-1545311630-51ea4a4c84de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNtaWxpbmclMjBwb3J0cmFpdCUyMGhhcHB5fGVufDF8fHx8MTc3MzE2MTY4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Sarah M."
                  className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-lg"
                />
                <div>
                  <div className="font-bold text-gray-900 text-lg">Sarah Martinez</div>
                  <div className="text-sm font-semibold bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent flex items-center gap-1">
                    <Star className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                    15kg saved this month
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                "FridgeWise completely transformed my kitchen habits. I've reduced waste by 90% and discovered amazing recipes I never would have tried!"
              </p>
            </div>

            <div className="bg-linear-to-br from-blue-50 via-cyan-50 to-sky-50 rounded-[2rem] p-7 border-2 border-blue-100 shadow-xl">
              <div className="flex items-center gap-4 mb-5">
                <img
                  src="https://images.unsplash.com/photo-1605298046196-e205d0d699d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBzbWlsaW5nJTIwcG9ydHJhaXQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzczMjYyMzA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="James K."
                  className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-lg"
                />
                <div>
                  <div className="font-bold text-gray-900 text-lg">James Kim</div>
                  <div className="text-sm font-semibold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent flex items-center gap-1">
                    <Award className="w-4 h-4 text-blue-500 fill-blue-500" />
                    92% waste reduction
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                "The AI scanning is incredibly accurate! It's like having a smart assistant that actually cares about sustainability."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 bg-linear-to-br from-emerald-500 via-green-500 to-teal-600 text-white relative overflow-hidden">
        {/* linear orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-linear-to-br from-green-400 to-emerald-300 rounded-full mix-blend-overlay filter blur-3xl opacity-50" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-linear-to-br from-teal-400 to-cyan-300 rounded-full mix-blend-overlay filter blur-3xl opacity-50" />
        </div>
        
        <div className="max-w-md mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-5">
            Ready to Make an Impact?
          </h2>
          <p className="text-emerald-50 mb-10 text-xl leading-relaxed">
            Join 50,000+ users reducing food waste and saving money
          </p>
          <Link href="/dashboard">
            <Button className="bg-white text-emerald-600 hover:bg-emerald-50 rounded-[1.5rem] h-16 px-10 text-lg font-bold shadow-2xl">
              Start Your Journey
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 bg-gray-900 text-white">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold mb-2 bg-linear-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              FridgeWise
            </h3>
            <p className="text-gray-400 text-lg">Reduce food waste, one meal at a time 🌱</p>
          </div>

          <div className="grid grid-cols-3 gap-8 text-sm mb-10">
            <div>
              <h4 className="font-bold mb-4 bg-linear-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">Product</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="#" className="hover:text-emerald-400">Features</Link></li>
                <li><Link href="#" className="hover:text-emerald-400">Pricing</Link></li>
                <li><Link href="#" className="hover:text-emerald-400">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 bg-linear-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="#" className="hover:text-emerald-400">About</Link></li>
                <li><Link href="#" className="hover:text-emerald-400">Blog</Link></li>
                <li><Link href="#" className="hover:text-emerald-400">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 bg-linear-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="#" className="hover:text-emerald-400">Help</Link></li>
                <li><Link href="#" className="hover:text-emerald-400">Contact</Link></li>
                <li><Link href="#" className="hover:text-emerald-400">Privacy</Link></li>
              </ul>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500 pt-8 border-t border-gray-800">
            © 2026 FridgeWise. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
  
