import { Github, ExternalLink, Calendar, Flame } from "lucide-react";

export const GithubStats = () => {
  return (
    <section id="github-stats" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Coding <span className="text-primary">Activity</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* 1. General Stats Card */}
          <div className="gradient-border p-6 hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center gap-2 mb-4">
              <Github className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold">GitHub Stats</h3>
            </div>
            <div className="flex justify-center">
              <img
                src="https://github-readme-stats.vercel.app/api?username=UdaraChamidu&show_icons=true&theme=transparent&hide_border=true&title_color=7358f2&text_color=888888&icon_color=7358f2&count_private=true"
                alt="Udara's GitHub Stats"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* 2. Streak Stats Card */}
          <div className="gradient-border p-6 hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold">Commit Streak</h3>
            </div>
            <div className="flex justify-center">
                 <img 
                    src="https://github-readme-streak-stats.herokuapp.com/?user=UdaraChamidu&theme=transparent&hide_border=true&title_color=7358f2&text_color=888888&icon_color=7358f2&ring=7358f2&fire=7358f2&currStreakLabel=7358f2" 
                    alt="GitHub Streak"
                    className="w-full h-auto"
                />
            </div>
          </div>
        </div>

        {/* 3. Top Languages & Heatmap Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Top Languages (Takes up 1 column on large screens) */}
            <div className="lg:col-span-1 gradient-border p-6 hover:scale-[1.02] transition-transform duration-300">
                <div className="flex items-center gap-2 mb-4">
                <div className="p-1 rounded bg-primary/10">
                    <div className="w-3 h-3 bg-primary rounded-full" />
                </div>
                <h3 className="text-xl font-semibold">Languages</h3>
                </div>
                <div className="flex justify-center">
                <img
                    src="https://github-readme-stats.vercel.app/api/top-langs/?username=UdaraChamidu&layout=compact&theme=transparent&hide_border=true&title_color=7358f2&text_color=888888&icon_color=7358f2&langs_count=8"
                    alt="Udara's Top Languages"
                    className="w-full h-auto"
                />
                </div>
            </div>

            {/* Contribution Heatmap (Takes up 2 columns on large screens) */}
            <div className="lg:col-span-2 gradient-border p-6 hover:scale-[1.01] transition-transform duration-300">
                <div className="flex items-center gap-2 mb-6">
                    <Calendar className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-semibold">Contribution History</h3>
                </div>
                <div className="flex justify-center overflow-x-auto pb-2">
                    {/* This API generates the calendar image in your theme color (7358f2) */}
                    <img 
                        src="https://ghchart.rshah.org/7358f2/UdaraChamidu" 
                        alt="Udara's Github Chart"
                        className="w-full min-w-[600px] h-auto opacity-90"
                    />
                </div>
            </div>
        </div>

        {/* Link to Profile */}
        <div className="text-center">
          <a
            href="https://github.com/UdaraChamidu"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            View Full Profile <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};