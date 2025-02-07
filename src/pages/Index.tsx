import { TypingTest } from "@/components/TypingTest";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container max-w-4xl py-8">
        <h1 className="text-4xl font-mono font-bold text-center mb-12 text-primary">TypeSpeed</h1>
        <TypingTest />
      </main>
      <footer className="fixed bottom-0 left-0 right-0 py-4 bg-background/80 backdrop-blur-sm">
        <div className="container max-w-4xl flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>tab + enter - restart test</span>
            <span>esc - quit test</span>
          </div>
          <div className="flex items-center gap-2">
            <span>v1.0.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;