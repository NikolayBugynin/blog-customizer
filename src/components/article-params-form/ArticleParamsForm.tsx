import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

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
	ArticleStateType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import clsx from 'clsx';

interface IArticleParamsFormProps {
	selectedFont: OptionType; // Выбранный шрифт
	selectedFontSize: OptionType; // Выбранный размер шрифта
	selectedFontColor: OptionType; // Выбранный цвет шрифта
	selectedBackgroundColor: OptionType; // Выбранный цвет фона
	selectedContentWidth: OptionType; // Выбранная ширина
	onFontChange: (fontFamily: OptionType) => void; // Функция для изменения шрифта
	onFontColorChange: (fontColor: OptionType) => void; // Функция для изменения цвета шрифта
	onFontSizeChange: (fontSize: OptionType) => void; // Функция для изменения цвета шрифта
	onBackgroundColorChange: (backgroundColor: OptionType) => void; // Функция для изменения фона
	onContentWidthChange: (selectedContentWidth: OptionType) => void; // Функция изменения ширины
	onReset: (defaultState: ArticleStateType) => void; // Функция для сброса настроек
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
	const [tempSettings, setTempSettings] = useState<ArticleStateType>({
		fontFamilyOption: selectedFont,
		fontSizeOption: selectedFontSize,
		fontColor: selectedFontColor,
		backgroundColor: selectedBackgroundColor,
		contentWidth: selectedContentWidth,
	});

	// Универсальный обработчик изменений
	const handleOptionChange = (
		key: keyof ArticleStateType,
		selected: OptionType
	) => {
		setTempSettings((prev) => ({
			...prev, // Копируем предыдущее состояние
			[key]: selected, // Обновляем конкретное поле
		}));
	};

	const handleApply = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault(); // Отменяем перезагрузку страницы
		onFontChange(tempSettings.fontFamilyOption); // Передаем выбранный шрифт в родительский компонент
		onFontSizeChange(tempSettings.fontSizeOption); // Передаем выбранный размер шрифта
		onFontColorChange(tempSettings.fontColor); // Передаем выбранный цвет шрифта
		onBackgroundColorChange(tempSettings.backgroundColor); // Передаем выбранный цвет фона
		onContentWidthChange(tempSettings.contentWidth); // Передаем выбранную ширину
	};

	// Обработчик для кнопки "Сбросить"
	const handleReset = () => {
		onReset(defaultArticleState); // Передаем defaultArticleState в родительский компонент
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
					className={clsx(styles.container, {
						[styles.container_open]: isFormVisible, // Добавляем класс для открытия
					})}>
					<form onSubmit={handleApply} className={styles.form}>
						<Text as='h1' size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
						<Select
							selected={
								fontFamilyOptions.find(
									(opt) => opt.value === tempSettings.fontFamilyOption.value
								) || null
							}
							options={fontFamilyOptions}
							title='шрифт'
							onChange={(selected) =>
								handleOptionChange('fontFamilyOption', selected)
							}
						/>
						<RadioGroup
							selected={
								fontSizeOptions.find(
									(opt) => opt.value === tempSettings.fontSizeOption.value
								) || defaultArticleState.fontSizeOption
							}
							options={fontSizeOptions}
							title='размер шрифта'
							name='font-size'
							onChange={(selected) =>
								handleOptionChange('fontSizeOption', selected)
							}
						/>
						<Select
							selected={
								fontColors.find(
									(opt) => opt.value === tempSettings.fontColor.value
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
									(opt) => opt.value === tempSettings.backgroundColor.value
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
									(opt) => opt.value === tempSettings.contentWidth.value
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
