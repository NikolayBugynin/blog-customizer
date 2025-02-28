import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
	OptionType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// Объединенное состояние
	const [settings, setSettings] =
		useState<ArticleStateType>(defaultArticleState);

	// Универсальный обработчик изменений
	const handleOptionChange = (
		key: keyof ArticleStateType,
		selected: OptionType
	) => {
		setSettings((prev) => ({
			...prev, // Копируем предыдущее состояние
			[key]: selected, // Обновляем конкретное поле
		}));
	};

	// Функция для сброса
	const handleReset = (defaultState: ArticleStateType) => {
		setSettings(defaultState); // Устанавливаем состояние по умолчанию
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': settings.fontFamilyOption.value,
					'--font-size': settings.fontSizeOption.value,
					'--font-color': settings.fontColor.value,
					'--container-width': settings.contentWidth.value,
					'--bg-color': settings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				selectedFont={settings.fontFamilyOption}
				selectedFontSize={settings.fontSizeOption}
				selectedFontColor={settings.fontColor}
				selectedBackgroundColor={settings.backgroundColor}
				selectedContentWidth={settings.contentWidth}
				onFontChange={(selected) =>
					handleOptionChange('fontFamilyOption', selected)
				}
				onFontSizeChange={(selected) =>
					handleOptionChange('fontSizeOption', selected)
				}
				onFontColorChange={(selected) =>
					handleOptionChange('fontColor', selected)
				}
				onBackgroundColorChange={(selected) =>
					handleOptionChange('backgroundColor', selected)
				}
				onContentWidthChange={(selected) =>
					handleOptionChange('contentWidth', selected)
				}
				onReset={handleReset} // Передаем handleReset
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
