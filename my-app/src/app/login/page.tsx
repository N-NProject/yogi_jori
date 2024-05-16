import Image from "next/image";
import PostPreview from "@/components/PostPreview"
import Logo from "@/assets/Logo.svg"

const Login = () => {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="flex pt-36 pb-12 justify-center items-center">
        <Image src={Logo} alt="Logo" width={400} height={400} />
      </div>
      <div className="flex justify-center">
        <button className="w-[22.5rem] h-[3rem] rounded-[0.25rem] bg-yellow-400">
          <span className="text-base font-semibold">kakao로 간편 로그인</span>  
        </button>
      </div>
      
    </main>
  );
};

export default Login;
