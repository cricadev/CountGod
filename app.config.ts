export default defineAppConfig({
  ui: {

    icons: "all",
    primary: "Bg",
    gray: "Bg",
    button: {
      base: "focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 justify-center",
      font: "font-normal font-monserrat",
      rounded: "rounded-full",
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
        providers: "",
      },
      gap: {
        "2xs": "gap-x-1",
        xs: "gap-x-1.5",
        sm: "gap-x-1.5",
        md: "gap-x-2",
        lg: "gap-x-2.5",
        xl: "gap-x-2.5",
        providers: "gap-x-2.5",
      },
      padding: {
        "2xs": "px-2 py-1",
        xs: "px-2.5 py-1.5",
        sm: "px-2.5 py-1.5",
        md: "px-3 py-2",
        lg: "px-3.5 py-2.5",
        xl: "px-3.5 py-2.5",
        providers: "px-4 py-4",
      },
      square: {
        "2xs": "p-1",
        xs: "p-1.5",
        sm: "p-1.5",
        md: "p-2",
        lg: "p-2.5",
        xl: "p-2.5",
        providers: "p-2.5",
      },
      color: {
        primary: {
          solid:
            "bg-white dark:bg-white text-[#797979]",
        },


      },
      variant: {
        ghost: "hover:bg-transparent",
      }
      ,
      icon: {
        base: "flex-shrink-0",
        size: {
          "2xs": "h-4 w-4",
          xs: "h-4 w-4",
          sm: "h-5 w-5",
          md: "h-5 w-5",
          lg: "h-5 w-5",
          xl: "h-6 w-6",
          providers: "h-6 w-6",
        },
      },
      default: {
        size: "lg",
        variant: "solid",
        color: "primary",
        loadingIcon: "i-heroicons-arrow-path-20-solid",
      },
    },
  }
})