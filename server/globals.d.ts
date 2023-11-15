declare namespace NodeJS {
	export interface ProcessEnv {
		NODE_ENV?: 'development' | 'production' | 'testing';

		AWS_BUCKET_NAME: string;
	}
}
