import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import cn from 'classnames';

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import { Select } from 'src/ui/select';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	OptionType,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

interface IArticleParamsFormProps {
	selectedFont: string; // Выбранный шрифт
	selectedFontSize: string; // Выбранный размер шрифта
	selectedFontColor: string; // Выбранный цвет шрифта
	selectedBackgroundColor: string; // Выбранный цвет фона
	selectedContentWidth: string; // Выбранная ширина
	onFontChange: (fontFamily: string) => void; // Функция для изменения шрифта
	onFontColorChange: (fontColor: string) => void; // Функция для изменения цвета шрифта
	onFontSizeChange: (fontSize: string) => void; // Функция для изменения цвета шрифта
	onBackgroundColorChange: (backgroundColor: string) => void; // Функция для изменения фона
	onContentWidthChange: (selectedContentWidth: string) => void; // Функция изменения ширины
	onReset: () => void; // Функция для сброса шрифта
}

// Интерфейс для объединенного состояния главной страницы
export interface IPageSettings {
	fontFamily: string;
	fontSize: string;
	fontColor: string;
	backgroundColor: string;
	contentWidth: string;
}

export const ArticleParamsForm = ({
	selectedFont,
	selectedFontSize,
	selectedFontColor,
	selectedBackgroundColor,
	selectedContentWidth,
	onFontChange,
	onFontSizeChange,
	onFontColorChange,
	onBackgroundColorChange,
	onContentWidthChange,
	onReset,
}: IArticleParamsFormProps) => {
	const [isFormVisible, setIsFormVisible] = useState(false); // Состояние для видимости формы

	// Объединенное состояние для временного хранения настроек
	const [tempSettings, setTempSettings] = useState<IPageSettings>({
		fontFamily: selectedFont,
		fontSize: selectedFontSize,
		fontColor: selectedFontColor,
		backgroundColor: selectedBackgroundColor,
		contentWidth: selectedContentWidth,
	});

	// Универсальный обработчик изменений
	const handleOptionChange = (
		key: keyof IPageSettings,
		selected: OptionType
	) => {
		setTempSettings((prev) => ({
			...prev, // Копируем предыдущее состояние
			[key]: selected.value, // Обновляем конкретное поле
		}));
	};

	const handleApply = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault(); // Отменяем перезагрузку страницы
		onFontChange(tempSettings.fontFamily); // Передаем выбранный шрифт в родительский компонент
		onFontSizeChange(tempSettings.fontSize); // Передаем выбранный размер шрифта
		onFontColorChange(tempSettings.fontColor); // Передаем выбранный цвет шрифта
		onBackgroundColorChange(tempSettings.backgroundColor); // Передаем выбранный цвет фона
		onContentWidthChange(tempSettings.contentWidth); // Передаем выбранную ширину
	};

	// Обработчик для кнопки "Сбросить"
	const handleReset = () => {
		setTempSettings({
			fontFamily: defaultArticleState.fontFamilyOption.value,
			fontSize: defaultArticleState.fontSizeOption.value,
			fontColor: defaultArticleState.fontColor.value,
			backgroundColor: defaultArticleState.backgroundColor.value,
			contentWidth: defaultArticleState.contentWidth.value,
		});
		onReset(); // Вызываем функцию сброса из родительского компонента
	};

	// Обработчик для открытия/закрытия формы
	const toggleFormVisibility = () => {
		setIsFormVisible((prev) => !prev); // Инвертируем состояние
	};
	return (
		<>
			<ArrowButton isOpen={isFormVisible} onClick={toggleFormVisibility} />
			{isFormVisible && (
				<aside
					className={cn(styles.container, {
						[styles.container_open]: isFormVisible, // Добавляем класс для открытия
					})}>
					<form onSubmit={handleApply} className={styles.form}>
						<Text as='h1' size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
						<Select
							selected={
								fontFamilyOptions.find(
									(opt) => opt.value === tempSettings.fontFamily
								) || null
							}
							options={fontFamilyOptions}
							title='шрифт'
							onChange={(selected) =>
								handleOptionChange('fontFamily', selected)
							}
						/>
						<RadioGroup
							selected={
								fontSizeOptions.find(
									(opt) => opt.value === tempSettings.fontSize
								) || defaultArticleState.fontSizeOption
							}
							options={fontSizeOptions}
							title='размер шрифта'
							name='font-size'
							onChange={(selected) => handleOptionChange('fontSize', selected)}
						/>
						<Select
							selected={
								fontColors.find(
									(opt) => opt.value === tempSettings.fontColor
								) || null
							}
							options={fontColors}
							title='цвет шрифта'
							onChange={(selected) => handleOptionChange('fontColor', selected)}
						/>
						<Separator />
						<Select
							selected={
								backgroundColors.find(
									(opt) => opt.value === tempSettings.backgroundColor
								) || null
							}
							options={backgroundColors}
							title='цвет фона'
							onChange={(selected) =>
								handleOptionChange('backgroundColor', selected)
							}
						/>
						<Select
							selected={
								contentWidthArr.find(
									(opt) => opt.value === tempSettings.contentWidth
								) || null
							}
							options={contentWidthArr}
							title='ширина контента'
							onChange={(selected) =>
								handleOptionChange('contentWidth', selected)
							}
						/>
						<div className={styles.bottomContainer}>
							<Button
								onClick={handleReset}
								title='Сбросить'
								htmlType='reset'
								type='clear'
							/>
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
