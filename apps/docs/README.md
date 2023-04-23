Create hooks:

useTime
useNavigation (back, reload, navigateTo, etc.)
useAnimationFrame


useTheme:
Set a data-x attribute on the document like theme="dark"
In CSS change values with

:root {
    --color: light;
}

[theme="dark"] :root {
    --color: dark;
}

-- OR --

[theme="dark"] .my-class {

}


------------------------------------------------------

Reference other hooks or libraries

react-hook-form