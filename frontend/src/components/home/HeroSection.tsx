import { ArrowRight } from "lucide-react";
import { Link } from "../../contexts/MockContext";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <div className="relative bg-background py-6">
      <div className="px-4">
        <div className="text-left">
          <h1 className="text-3xl text-foreground mb-2">
            あなたの声から、
            <br />
            政策が動き出す
          </h1>

          {/* メインイメージ */}
          <div className="relative w-full max-w-sm mx-auto mb-4 rounded-lg overflow-hidden">
            <img
              src="/images/MainImage.png"
              alt="いどばたのメインイメージ"
              className="w-full h-auto"
            />
          </div>

          <p className="text-base text-muted-foreground">
            社会をもっと良くするヒントは、あなたの実感にあります。
          </p>
          <p className="text-base text-muted-foreground mb-4">
            今、全国で寄せられている声と、動き出した政策案をご覧ください。
          </p>

          <div className="flex justify-start">
            <div className="text-center mt-4">
              <Button asChild size="lg">
                <Link to="/about">
                  このサイトについて
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
