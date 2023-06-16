# **Начало работы**

- `создаем папку в директории basics-4 с вашим ником`
- `cd "название папки которую создали"`
- `npm init`

---

# Установка Parcel

```
npm install parcel --save-dev
```

### Запуск Parcel

```
npx parcel index.html
```

---

# Установка Eslint

```
npm i -D eslint eslint-plugin-node eslint-config-node eslint-config-airbnb
```

## Создание файла .eslintrc

### На Windows

```
echo > .eslintrc
```

### На MacOS и Linux

```
touch .eslintrc
```

## Настройка .eslintrc

```
{
  "extends": ["airbnb"],
  "globals": {
    "window": true,
    "document": true,
    "localStorage": true
  },
  "rules": {
    "no-unused-vars": "warn",
    "no-console": "off",
    "func-names": "off",
    "object-shorthand": "off",
    "max-classes-per-file": ["error", 10],
    "import/prefer-default-export": "off",
    "prefer-const": "warn",
    "no-var": "error",
    "for-direction": "error",
    "no-shadow": "error",
  }
}
```

- `"extends"` - Указание конфигурации
- `"globals"` - Это свойство конфигурации ESLint, которое используется для определения глобальных переменных, которые могут быть использованы в вашем коде
- `"no-unused-var"` - Это правило отвечает за обнаружение и предупреждение о неиспользуемых переменных в вашем коде
- `"no-console"` - Это правило отвечает за обнаружение и предупреждение о неиспользуемых переменных в вашем коде
- `"func-names"` - Это правило определяет, должны ли функции иметь имена или могут быть анонимными.
- `"object-shorthand"` - Это правило предлагает использовать краткий синтаксис объектных литералов, такой как { foo } вместо { foo: foo }
- `"max-classes-per-file"` - Это правило определяет максимальное количество классов, которые можно объявить в одном файле
- `"import/prefer-default-export"` - Это правило предпочитает использование экспорта по умолчанию (export default) в модуле
- `"prefer-const"` - Это правило рекомендует использовать ключевое слово const вместо let или var, если значение переменной не изменяется.
- `"no-var"` - Это правило запрещает использование ключевого слова var для объявления переменных и рекомендует использовать let или const вместо него.
- `"for-direction"` - Это правило проверяет наличие ошибок в направлении цикла for
- `"no-shadow"` - Это правило запрещает объявление переменных, которые скрывают переменные из более высокого уровня области видимости.

## Настройка ESLINT для редактирования при сохранении

Открываем `settings.json` и вставляем следующую команду

```
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
},
"eslint.validate": ["javascript"],
```

---

# Установка **Prettier**

```
npm i -D prettier eslint-plugin-prettier eslint-config-prettier
```

## Создание файла .prettierrc

### На Windows

```
echo > .prettierrc
```

### На MacOS и Linux

```
touch .prettierrc
```

### Настройка .prettierrc

```
{
  "tabWidth": 2,
  "useTabs": true,
  "trailingComma": "all",
  "semi": true,
  "printWidth": 100
}
```

### Обновляем .eslintrc

```
{
  "extends": ["airbnb", "prettier", "plugin:prettier/recommended"],
  "plugins": ["prettier"],
  "globals": {
    "window": true,
    "document": true,
    "localStorage": true
  },
  "rules": {
    "prettier/prettier": ["error",{
      "endOfLine": "auto"}
    ],
    "no-unused-vars": "warn",
    "no-console": "off",
    "func-names": "off",
    "object-shorthand": "off",
    "max-classes-per-file": ["error", 10],
    "import/prefer-default-export": "off",
    "prefer-const": "warn",
    "no-var": "error",
    "for-direction": "error",
    "no-shadow": "error",
  }
}
```

- `"plugins"` - Эта настройка определяет список плагинов, используемых в вашей конфигурации.
- `"prettier/prettier"` - Используется для проверки соответствия кода вашего проекта правилам форматирования плагина.

---

# Создание **.gitignore**

### На Windows

```
echo > .gitignore
```

### На MacOS и Linux

```
touch .gitignore
```

## Настройка .gitignore

```
*.key
*.env
```

---

# Структура вашей файловой директории

```
└── basics-4/                 # Папка git директории
  └── nickname/               # Ваша рабочая папка
    ├── .parcel-cache/        # Папка для работы parcel
    ├── dist/                 # Билд parcel
    ├── node-modules/         # Папка библиотек
    └── src/                  # Рабочая папка
      ├── assets/             # Папка для изображений
      ├── css/                # Папка со стилями
      ├── js/                 # Папка со скриптами
      └── index.html          # Основной файл index.html
    ├── package.json          # Основные зависимости
    ├── package-lock.json     # Содержит точные версии зависимостей
    ├── .prettierrc           # Конфиг для prettier
    ├── .eslintrc             # Конфиг для eslint
    └── .gitignore            # Конфиг для gitignore для ваших личных настроек
  ├── .gitignore              # Конфиг для gitignore
  └── README.MD               # Файл README
```

---

# Настройка **package.json**

- В файле `package.json` меняем эти значения

```
"source": "src/index.html",
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "parcel",
  "build": "parcel build",
  "lint": "eslint --fix .",
  "format": "prettier --write ."
}
```

## Команды

- `npm run start - запускает parcel`
- `npm run build - создает билд parcel`
- `npm run lint - запускает eslint для всех файлов`
- `npm run format - запускает prettier для всех файлов`
