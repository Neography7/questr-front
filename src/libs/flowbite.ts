import type { CustomFlowbiteTheme } from 'flowbite-react';

const customTheme: CustomFlowbiteTheme = {
    button: {
        color: {
            primary: 'bg-red-500 hover:bg-red-600',
        },
    },
    toggleSwitch: {
        toggle: {
            checked: {
                color: {
                    blue: "bg-blue-700 border-blue-700",
                }
            }
        }
    },
    textInput: {
        "field": {
            "input": {
                "colors": {
                    "gray": "bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                }
            }
        }
    },
    textarea: {
        "colors": {
          " gray": "bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500",
        },
    },
    dropdown: {
        "arrowIcon": "ml-2 h-4 w-4",
        "content": "focus:outline-none",
        "floating": {
            "animation": "transition-opacity",
            "arrow": {
                "base": "absolute z-10 h-2 w-2 rotate-45",
                "style": {
                    "dark": "bg-gray-900 dark:bg-gray-700",
                    "light": "bg-white",
                    "auto": "bg-white dark:bg-gray-700"
                },
                "placement": "-4px"
            },
            "base": "z-10 w-fit rounded divide-y divide-gray-100 shadow focus:outline-none",
            "content": "py-1 text-sm text-gray-700 dark:text-gray-200",
            "divider": "h-px bg-gray-100 dark:bg-gray-600",
            "header": "block py-2 px-4 text-sm text-gray-700 dark:text-gray-200",
            "hidden": "invisible opacity-0",
            "item": {
                "container": "",
                "base": "flex items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer w-full hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white",
                "icon": "mr-2 h-4 w-4"
            },
            "style": {
                "dark": "bg-gray-900 text-white dark:bg-gray-700",
                "light": "border border-gray-200 bg-white text-gray-900",
                "auto": "border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white"
            },
            "target": "w-fit"
        },
        "inlineWrapper": "flex items-center"
      }
}

export default customTheme;