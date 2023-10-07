import girl from './assets/girl.png'
import phone from './assets/phone.png'
import AuthForm from './components/AuthForm'
import Image from 'next/image'

function Login() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-pink-100 to-white">
      <h1 className="mb-10 text-2xl">鍾珮玲服務處</h1>
      <div className="relative flex h-[400px] w-[350px] flex-col items-center rounded-3xl bg-[hsl(350,30%,49.8%)] ">
        <Image
          className="absolute -left-24 bottom-0  z-10 w-[131px]"
          src={girl}
          alt=""
          priority={true}
        />
        <Image
          className="absolute -right-24 bottom-0  z-10 w-[131px]"
          src={phone}
          alt=""
          priority={true}
        />
        <h1 className="p-8 text-2xl text-white">管理者登入</h1>
        <AuthForm />
      </div>
    </div>
  )
}

export default Login
