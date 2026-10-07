import { useRouter } from '@/context/RouterContext';
import { ArrowRight, BookOpen, Globe, MapPin } from 'lucide-react';

export default function AboutPage() {
  const { navigate } = useRouter();

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-900 text-parchment-100 py-16 lg:py-24">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/13278839/pexels-photo-13278839.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Library shelves"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/80 to-ink-900/60" />
        </div>
        <div className="relative container-book">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-gold-500" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold-400">आमच्याबद्दल</span>
            </div>
            <h1 className="font-display text-4xl lg:text-5xl leading-tight">
              अशोक अनंत नेरळेकर बुकसेलर्स
            </h1>
            <p className="mt-4 text-lg text-parchment-300">
              धार्मिक, अध्यात्मिक आणि संस्कृत साहित्यासाठी समर्पित पुस्तकांचे दुकान.
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 lg:py-24">
        <div className="container-book">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="divider-gold mb-4" />
              <h2 className="font-display text-3xl text-ink-900 leading-tight">
                आमचे पुस्तकांचे दुकान
              </h2>
              <div className="mt-6 space-y-4 text-ink-700 leading-relaxed">
                <p>
                  अशोक अनंत नेरळेकर बुकसेलर्स हे धार्मिक, अध्यात्मिक आणि संस्कृत साहित्यातील पुस्तकांचे दुकान आहे. आमचा संग्रह भारतीय विचारांच्या प्रमुख परंपरांव्यापी आहे — वेद आणि उपनिषदांपासून महाकाव्यांपर्यंत, भक्ती काव्यापासून तात्त्विक ग्रंथांपर्यंत.
                </p>
                <p>
                  आम्ही संपूर्ण भारतातील वाचकांना सेवा देतो, प्रामुख्याने मराठी, हिंदी आणि संस्कृत भाषेतील पुस्तके देतो. तुम्ही तत्त्वज्ञानाचे विद्यार्थी असाल, विधींचे साधक असाल, किंवा अध्यात्मिक ज्ञानाचे रास्ता असाल, आमची पुस्तके तुमच्या प्रवासासाठी निवडली आहेत.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src="https://images.pexels.com/photos/34592/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200"
                alt="Leather-bound books on shelf"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-3 border border-gold-500/20 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Publication */}
      <section className="py-16 lg:py-24 bg-parchment-200/50">
        <div className="container-book">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 relative aspect-[4/3] overflow-hidden">
              <img
                src="https://images.pexels.com/photos/8391464/pexels-photo-8391464.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Vintage books"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-3 border border-gold-500/20 pointer-events-none" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="divider-gold mb-4" />
              <h2 className="font-display text-3xl text-ink-900 leading-tight">
                प्रज्ञेश प्रकाशन
              </h2>
              <div className="mt-6 space-y-4 text-ink-700 leading-relaxed">
                <p>
                  प्रज्ञेश प्रकाशन हे आमच्या पुस्तकांच्या दुकानाशी संलग्न प्रकाशन गट आहे. ते मराठी, हिंदी आणि संस्कृत भाषेतील धार्मिक, अध्यात्मिक आणि तात्त्विक साहित्याचे जतन आणि प्रसार करण्यासाठी समर्पित आहे.
                </p>
                <p>
                  प्रज्ञेश प्रकाशनद्वारे, आम्ही मूळ ग्रंथ, भाष्ये आणि शास्त्रीय कार्ये प्रकाशित करतो — भारतीय परंपरांचे ज्ञान आधुनिक वाचकांपर्यंत पोहोचवतो.
                </p>
              </div>
              <button
                onClick={() => navigate('/shop?publication=Pradnyesh Prakashan')}
                className="mt-8 inline-flex items-center gap-2 text-gold-700 hover:text-gold-600 text-sm tracking-wide link-underline"
              >
                प्रज्ञेश प्रकाशनची पुस्तके पहा <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24">
        <div className="container-book">
          <div className="text-center mb-12">
            <div className="divider-gold mx-auto mb-4" />
            <h2 className="font-display text-3xl lg:text-4xl text-ink-900">आम्ही काय देतो</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: 'निवडलेले साहित्य', desc: 'परंपरा आणि भाषांमधील धार्मिक आणि अध्यात्मिक पुस्तकांचा काळजीपूर्वक निवडलेला संग्रह.' },
              { icon: Globe, title: 'तीन भाषा', desc: 'मराठी, हिंदी आणि संस्कृत भाषेतील पुस्तके, संपूर्ण भारतातील वाचक आणि विद्वानांसाठी.' },
              { icon: MapPin, title: 'पुणे दुकाने', desc: 'पुण्यातील वैयक्तिक दुकाने जिथे तुम्ही आमचा संग्रह प्रत्यक्ष पाहू शकता.' },
            ].map(item => (
              <div key={item.title} className="text-center px-4">
                <div className="w-14 h-14 bg-ink-800 mx-auto flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6 text-gold-400" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg text-ink-900 tracking-wide">{item.title}</h3>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-ink-900 text-parchment-100">
        <div className="container-book text-center">
          <h2 className="font-display text-3xl lg:text-4xl">तुमचा वाचन प्रवास सुरू करा</h2>
          <p className="mt-3 text-parchment-300 max-w-xl mx-auto">
            पवित्र आणि अध्यात्मिक साहित्याचा आमचा संग्रह पहा.
          </p>
          <button onClick={() => navigate('/shop')} className="btn-primary bg-gold-600 hover:bg-gold-700 mt-8">
            पुस्तके पहा <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
