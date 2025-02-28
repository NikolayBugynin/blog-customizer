import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import {
	ArticleParamsForm,
	IPageSettings,
} from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// Объединенное состояние
	const [settings, setSettings] = useState<IPageSettings>({
		fontFamily: defaultArticleState.fontFamilyOption.value,
		fontSize: defaultArticleState.fontSizeOption.value,
		fontColor: defaultArticleState.fontColor.value,
		backgroundColor: defaultArticleState.backgroundColor.value,
		contentWidth: defaultArticleState.contentWidth.value,
	});

	// Универсальный обработчик изменений
	const handleOptionChange = (key: keyof IPageSettings, value: string) => {
		setSettings((prev) => ({
			...prev, // Копируем предыдущее состояние
			[key]: value, // Обновляем конкретное поле
		}));
	};

	// Функция для сброса
	const handleReset = () => {
		setSettings({
			fontFamily: defaultArticleState.fontFamilyOption.value,
			fontSize: defaultArticleState.fontSizeOption.value,
			fontColor: defaultArticleState.fontColor.value,
			backgroundColor: defaultArticleState.backgroundColor.value,
			contentWidth: defaultArticleState.contentWidth.value,
		});
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': settings.fontFamily,
					'--font-size': settings.fontSize,
					'--font-color': settings.fontColor,
					'--container-width': settings.contentWidth,
					'--bg-color': settings.backgroundColor,
				} as CSSProperties
			}>
			<ArticleParamsForm
				selectedFont={settings.fontFamily}
				selectedFontSize={settings.fontSize}
				selectedFontColor={settings.fontColor}
				selectedBackgroundColor={settings.backgroundColor}
				selectedContentWidth={settings.contentWidth}
				onFontChange={(selected) => handleOptionChange('fontFamily', selected)}
				onFontSizeChange={(selected) =>
					handleOptionChange('fontSize', selected)
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
				onReset={handleReset}
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
