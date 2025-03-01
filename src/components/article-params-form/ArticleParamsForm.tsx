import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
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
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { useEnterSubmit } from 'src/ui/select/hooks/useEnterSubmit';

type ArticleParamsFormProps = {
	setAppState: (value: ArticleStateType) => void; // Функция для обновления состояния
};
export const ArticleParamsForm = ({
	setAppState, // Получаем setAppState из пропсов
}: ArticleParamsFormProps) => {
	const [isFormVisible, setIsFormVisible] = useState(false); // Состояние для видимости формы
	const asideRef = useRef<HTMLDivElement>(null); // ссылка на сайдбар
	const formRef = useRef<HTMLFormElement>(null); // Ссылка на форму

	useOutsideClickClose({
		isOpen: isFormVisible, // Текущее состояние открытия/закрытия
		onChange: (newValue) => setIsFormVisible(newValue), // Обновляем состояние
		onClose: () => setIsFormVisible(false), // Дополнительная функция для закрытия
		rootRef: asideRef, // Ссылка на элемент
	});

	/// Используем хук useEnterSubmit для формы
	useEnterSubmit({
		placeholderRef: formRef, // Передаем ссылку на форму
		onChange: () =>
			handleApply(
				new Event('submit') as unknown as React.FormEvent<HTMLFormElement>
			),
	});

	// Временное состояние для формы
	const [tempSettings, setTempSettings] =
		useState<ArticleStateType>(defaultArticleState);

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
		setAppState(tempSettings); // Обновляем состояние приложения
	};

	// Обработчик для кнопки "Сбросить"
	const handleReset = () => {
		setTempSettings(defaultArticleState); // Сбрасываем временное состояние
		setAppState(defaultArticleState); // Сбрасываем состояние приложения
	};

	// Обработчик для открытия/закрытия формы
	const toggleFormVisibility = () => {
		setIsFormVisible((prev) => !prev); // Инвертируем состояние
	};
	return (
		<>
			<ArrowButton isOpen={isFormVisible} onClick={toggleFormVisibility} />
			<aside
				ref={asideRef} // Привязываем ссылку к сайдбару
				className={clsx(styles.container, {
					[styles.container_open]: isFormVisible, // Добавляем класс для открытия
				})}>
				<form
					ref={formRef} // Привязываем ссылку к форме
					onSubmit={handleApply}
					onReset={handleReset}
					className={styles.form}>
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
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
