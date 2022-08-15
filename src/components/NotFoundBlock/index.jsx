import React from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
	return (
		<div className={styles.root}>
			<h2>
				<span>:(</span>
				<br />
				Ничего не найдено
			</h2>
			<p className={styles.description}>
				К сожалению данная страница отсутствует в нашем интернет-магазине
			</p>
		</div>
	);
};

export default NotFoundBlock;
