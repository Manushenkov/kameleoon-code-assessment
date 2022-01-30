export enum TestType {
	CLASSIC = 'CLASSIC',
	SERVER_SIDE = 'SERVER_SIDE',
	MVT = 'MVT',
}

export enum TestStatus {
	DRAFT = 'DRAFT',
	ONLINE = 'ONLINE',
	PAUSED = 'PAUSED',
	STOPPED = 'STOPPED',
}

export enum ACTION {
	SAVE_TESTS = 'SAVE_TESTS',
	SAVE_SITES = 'SAVE_SITES',
	CHANGE_SORT = 'CHANGE_SORT',
	CHANGE_FILTER = 'CHANGE_FILTER',
}

export enum SORT_TYPE {
	NAME = 'name',
	TYPE = 'type',
	SITE = 'site',
	STATUS = 'status',
	NONE = 'none',
}

export enum SORT_ORDER {
	ASC = 'ASC',
	DESC = 'DESC',
	NONE = 'NONE',
}
