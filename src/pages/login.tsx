import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { login } from "../../lib/wagtail/auth";

interface IForm {
  username: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  let logUserIn = useMutation({
    mutationFn: async ({username, password}: IForm) =>
      await login(username, password),
    onSuccess: (res) => {
      if (!res.tokenAuth) {
        throw new Error("there is no tokenAuth");
      }
      localStorage.setItem("JWT", res.tokenAuth?.token);
      localStorage.setItem("refreshJWT", res.tokenAuth?.refreshToken);
      let nextUrl = router.query.next;
      if (!nextUrl || typeof nextUrl !== "string") {
        router.push("/");
        return;
      }
      router.push(nextUrl);
    },
  });
  let form = useForm<IForm>();
  const onSubmit = (data: FieldValues) => {
    logUserIn.mutate({
      username: data.username,
      password: data.password,
    });
  };
  let formState = form.formState;

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
          <a
            href="#"
            className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="mr-2 h-8 w-8"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            Flowbite
          </a>
          <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                Sign in to your account
              </h1>
              <form
                onSubmit={form.handleSubmit((data) => {})}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <label
                    htmlFor="username"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your username
                  </label>
                  <input
                    {...form.register("username", { required: true })}
                    name="username"
                    id="username"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-600 focus:ring-indigo-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    placeholder="You username"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    {...form.register("password", { required: true })}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-600 focus:ring-indigo-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <a
                    href="#"
                    className="text-sm font-medium text-indigo-900 hover:underline dark:text-indigo-800"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  onClick={form.handleSubmit(onSubmit)}
                  type="submit"
                  className="w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="#"
                    className="font-medium text-indigo-900 hover:underline dark:text-indigo-800"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Login;
