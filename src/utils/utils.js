//保存的数据类型
let classToType = {};
/**
 * @namespace utils
 */
let utils = {
	/**
	 * @description 深度合并多个对象
	 * @function deepCopy
	 * @param {Object}  obj 需要复制的对象
	 * @memberof utils
	 * @returns [Object] 拷贝的新对象
	 */
	deepAssign(...args) {

		let options, name, src, copy, clone,
			target = args[0] || {},
			i = 1,
			length = args.length;


		for (; i < length; i++) {
			options = args[i];

			for (name in options) {

				src = target[name];
				copy = options[name];
				// 如果存在循环引用则跳出
				if (target === copy) {
					continue;
				}

				let type = utils.type(copy);

				if (type == 'array' || type == 'object') {

					// 如果是数组
					if (type == 'array') {
						clone = src && Array.isArray(src) ? src : [];
					} else {
						// 判断被扩展的对象中src是不是纯对象
						clone = src && utils.type(src) == 'object' ? src : {};
					}

					target[name] = this.deepAssign(clone, copy);
					//非数组和对象的合并
				} else if (copy !== undefined) {
					target[name] = copy;
				}
			}

		}

		// 原对象被改变，因此如果不想改变原对象，target可传入{}
		return target;
	},
	/**
	 * @description 深复制对象或数组
	 * @function deepCopy
	 * @param {Object}  obj 需要复制的对象
	 * @memberof utils
	 * @returns [Object] 拷贝的新对象
	 */
	deepCopy: function(obj) {
		// console.log(obj.nodeType);
		if (this.type(obj) == 'array') {
			let n = [];
			for (let i = 0; i < obj.length; i++) {
				n[i] = this.isDom(obj[i]) ? obj[i] : this.deepCopy(obj[i]);
			}
			return n;

		} else if (this.type(obj) == 'object') {
			let n = {};
			for (let i in obj) {
				n[i] = this.deepCopy(obj[i]);
			}
			return n;
		} else {
			return obj;
		}
	},
	sortByProps({
		item1,
		item2,
		props,
		order
	}) {

		let asc = order;
		let compar = 1;
		for (let i = 0; i < props.length; i++) {

			let o = props[i];
			if (Number(item1[o]) > Number(item2[o])) {
				compar = asc ? 1 : -1;
				return compar; // 大于时跳出循环。
			} else if (item1[o] === item2[o]) {
				compar = 0;
			} else {
				compar = asc ? -1 : 1;
				return compar; // 小于时跳出循环。
			}

		}

		return 0;
	},
	//1.依赖哪些key排序
	//2.正序还是倒序,true 为正序
	sortByAll(arr, key = 'sort', order = true) {

		key = [].concat(key);
		arr.sort((a, b) => {
			return this.sortByProps({
				item1: a,
				item2: b,
				props: key,
				order
			});
		});
		return arr;
	},
	/**
	 * @description 除去字符串中的空白
	 * @let Id
	 * @type {int} 
	 * @memberof utils
	 */
	trim: function(str) {
		return str.replace(/(^\s*)|(\s*$)/g, '');
	},
	/**
	 * @description 判断是否是dom 节点
	 * @let Id
	 * @type {int} 
	 * @memberof utils
	 */
	isDom: function(obj) {
		return (window.HTMLElement != null) ? (obj instanceof HTMLElement) : (obj && typeof obj === 'object' && obj.nodeType && typeof obj.nodeName === 'string');
	},
	/**
	 * @description 唯一id基数
	 * @let Id
	 * @type {int} 
	 * @memberof utils
	 */
	Id: 0,
	/**
	 * @description 得到唯一id
	 * @function getOnlyId
	 * @param {Int}  len id的随机的长度,除去router_
	 * @memberof utils
	 * @returns [String] id
	 */
	getOnlyId: function(len) {
		let str = '';
		len = len || 8;
		for (; str.length < len; str += Math.random().toString(36).substr(2));
		return str.substr(0, len).replace(/^\d/, 'a') + this.Id++;
	},
	/**
	 * @description 对目标对象进行遍历
	 * @function each
	 * @param {Object}  object 需要遍历的对象
	 * @param {Function}  cb 回调方法
	 * @param {context}  context 运行环境
	 * @memberof utils
	 */
	each: function(object, cb, context) {

		if (!object) return;
		let name, i = 0,
			length = object.length;
		let isObj = length == undefined; //判断是对象还是类数组   

		if (isObj) {
			for (name in object) {
				if (cb.call(context ? context : object[name], name, object[name]) === false) {
					break;
				}
			}
		} else {
			//遍历类数组元素
			/* eslint-disable */
			for (; i < length && false !== cb.call(context ? context : object, i, object[i++]);) {};

		}

		//这里返回的object是被修改后的对象或数组   
		// return object;
	},
	isEmptyObject: function(obj) {
		for (let str in obj) {
			return false;
		}
		return true;
	},
	isNumeric: function(obj) {
		let type = utils.type(obj);
		return (type === 'number' || type === 'string') &&

			// parseFloat NaNs numeric-cast false positives ('')
			// ...but misinterprets leading-number strings, particularly hex literals ('0x...')
			// subtraction forces infinities to NaN
			!isNaN(obj - parseFloat(obj));

	},
	/**
	 * @description 将类数组转为数组
	 * @function type
	 * @param {Object}  s 目标对象
	 * @memberof utils
	 * @returns {Array} 转换后的数组
	 */
	toArray: function(s) {
		try {
			return Array.prototype.slice.call(s);
		} catch (e) {
			let arr = [];
			for (let i = 0, len = s.length; i < len; i++) {
				//arr.push(s[i]);
				arr[i] = s[i]; //据说这样比push快
			}
			return arr;
		}
	},
	/**
	 * @description 获取数据类型
	 * @function type
	 * @param {Object}  obj 目标对象
	 * @memberof utils
	 * @returns {String} 对象的类型
	 */
	type: function(obj) {
		return obj == null ?
			String(obj) :
			classToType[Object.prototype.toString.call(obj)] || 'object';
	},
	/**
	 * @description 数组内简单类型的去重(无法区分 1 ,'1')
	 * @function unique
	 * @param {Array}  arr 目标对象
	 * @memberof utils
	 * @returns {Array} 去重之后的数组
	 */
	unique: function(arr) {
		let tmp = {},
			ret = [];

		this.each(arr, function(index, item) {
			if (!tmp[item]) {
				tmp[item] = 1;
				ret.push(item);
			}
		});

		return ret;
	},

	/**
	 * @description 获取坐标旋转固定角度之后的坐标
	 * @function getXY
	 * @param {Number}  x1 目标对象
	 * @param {Number}  y1 目标对象
	 * @param {Number}  num 角度
	 * @param {Boolean}  isHD 是否为弧度
	 * @memberof utils
	 * @returns {Array} 旋转之后的坐标
	 */
	/* eslint-disable-next-line */
	getXY: function(x1, y1, num, isHD) {
		if (!isHD) num = this.getHD(num);
		let x = Math.cos(num) * x1 + Math.sin(num) * y1;
		let y = Math.cos(num) * y1 - Math.sin(num) * x1;
		return [x | 0, y | 0];
	},
	/**
	 * @description 角度转弧度
	 * @function unique
	 * @param {Number}  num 角度
	 * @memberof utils
	 * @returns {Number} 弧度
	 */
	getHD: function(num) {
		return num * Math.PI / 180;
	},
	/**
	 * @description 弧度转角度
	 * @function unique
	 * @param {Number}  num 弧度
	 * @memberof utils
	 * @returns {Number} 角度
	 */
	getJD: function(num) {
		return num * 180 / Math.PI;
	},
	/**
	 * @description 获取dom节点的x,y,w,h
	 * @function getDOMPosition
	 * @param {div}  DOM dom节点
	 * @param {deep}  Boolean 是否加上浏览器已经滚动的距离
	 * @memberof utils
	 * @returns {Object} div的三围
	 */
	getDOMPosition: function(div, deep) {
		let rect = div.getBoundingClientRect();
		let top = document.documentElement.clientTop;
		let left = document.documentElement.clientLeft;
		let x = rect.left | 0;
		let y = rect.top | 0;
		let w = (rect.width || rect.right - x) | 0;
		let h = (rect.height || rect.bottom - y) | 0;
		if (deep) {
			x += utils.getScroll().left;
			y += utils.getScroll().top;
		}
		return {
			x: x - left,
			y: y - top,
			w: w,
			h: h
		};
	},
	/**
	 * @description 跨浏览器获取滚动条位置
	 * @function getScroll
	 * @memberof utils
	 * @returns {Object} 返回文档已滚动的距离
	 */
	getScroll: function() {
		return {
			top: document.documentElement.scrollTop || document.body.scrollTop,
			left: document.documentElement.scrollLeft || document.body.scrollLeft
		};
	},
	getWindowWH() {
		return {
			w: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
			h: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
		};
	},
	createDomWithStr: function(str) {
		let div = document.createElement('div');
		div.innerHTML = this.trim(str);
		return div.firstChild;
	},
	//判断时候是微信端
	isWX: function() {
		let ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	},
	toFloatStr(str, n) {
		if (n > 20) {
			n = 20;
		} else if (n < 0) {
			n = 0;
		}
		if (str.length > 20) return str;
		let num = parseFloat('0' + str.replace(/[^\d.]/, '')) + '';
		if (num.indexOf('.') > 0) {
			let arr = num.split('.');
			n = n - arr[1].length;
		} else {
			num += '.';
		}
		if (n > 0) {
			while (n > 0) {
				num += '0';
				n--;
			}
		} else if (n < 0) {
			num = num.substring(0, num.length + n);
		}
		return num;
	},

	//设置文档title的值
	setTitle: function(t) {
		document.title = t;
		let i = document.createElement('iframe');
		i.src = '//m.baidu.com/favicon.ico';
		i.style.display = 'none';
		i.onload = function() {
			setTimeout(function() {
				i.remove();
			}, 9);
		};
		document.body.appendChild(i);
	},
	//获取url后的参数
	getQueryString(name) {
		let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		let r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	},
	//获取指定字符串编码后的hash值
	getHash(str) {
		let I64BIT_TABLE =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'.split('');

		let hash = 5381;
		let i = str.length - 1;

		if (typeof str == 'string') {
			for (; i > -1; i--)
				hash += (hash << 5) + str.charCodeAt(i);
		} else {
			for (; i > -1; i--)
				hash += (hash << 5) + str[i];
		}
		let value = hash & 0x7FFFFFFF;

		let retValue = '';
		do {
			retValue += I64BIT_TABLE[value & 0x3F];
		}
		/* eslint-disable-next-line */
		while (value >>= 6);

		return retValue;
	},
	//判断是否是手机端
	isMobile: function() {
		return navigator.userAgent.match(/android|iphone|ipad|ipod|blackberry|meego|symbianos|windowsphone|ucbrowser/i);
	},
	/**
	 * @description 获取浏览器类型和版本号
	 * @function getBrowser
	 * @param {*}  version 是否返回版本号
	 * @memberof utils
	 * @returns {Object} 浏览器类型及版本号
	 */
	/* eslint-disable */
	getBrowser: function(version) {
		//version  是否返回版本号
		let ua_str = navigator.userAgent.toLowerCase(),
			ie_Tridents, trident, match_str = '1.0',
			ie_aer_rv, browser_chi_Type;

		//判断IE 浏览器, 
		if ('ActiveXObject' in self) {
			// ie_aer_rv:  指示IE 的版本.
			ie_aer_rv = (match_str = ua_str.match(/msie ([\d.]+)/)) ? match_str[1] :
				(match_str = ua_str.match(/rv:([\d.]+)/)) ? match_str[1] : 0;
			ie_Tridents = {
				'trident/7.0': 11,
				'trident/6.0': 10,
				'trident/5.0': 9,
				'trident/4.0': 8
			};
			//匹配 ie8, ie11, edge
			trident = (match_str = ua_str.match(/(trident\/[\d.]+|edge\/[\d.]+)/)) ? match_str[1] : undefined;
			browser_chi_Type = (ie_Tridents[trident] || ie_aer_rv) > 0 ? 'ie' : undefined;
		} else if (!this.isMobile()) {
			//判断 windows edge 浏览器
			// match_str[1]: 返回浏览器及版本号,如: 'edge/13.10586'
			// match_str[1]: 返回版本号,如: 'edge' 
			//若要返回 'edge' 请把下行的 'ie' 换成 'edge'。 注意引号及冒号是英文状态下输入的
			browser_chi_Type = (match_str = ua_str.match(/edge\/([\d]+\.)/)) ? 'edge' :
				//判断firefox 浏览器
				(match_str = ua_str.match(/firefox\/([\d]+\.)/)) ? 'firefox' :
				//判断chrome 浏览器
				(match_str = ua_str.match(/chrome\/([\d]+\.)/)) ? 'chrome' :
				//判断opera 浏览器
				(match_str = ua_str.match(/opera.([\d]+\.)/)) ? 'opera' :
				//判断safari 浏览器
				(match_str = ua_str.match(/version\/([\d]+\.).*safari/)) ? 'safari' : undefined;
		} else {
			browser_chi_Type = ['手机', this.isMobile()[0] || 'android']
		}
		//返回浏览器类型和版本号

		let verNum, verStr;
		verNum = trident && ie_Tridents[trident] ? ie_Tridents[trident] : match_str[1];
		return (version != undefined) ? [browser_chi_Type, +parseInt(verNum)] : browser_chi_Type;

	},
	/* eslint-disable */
	browserInfo: {

	},
	/**
	 * @description 贝塞尔缓动曲线
	 * @function Ease
	 * @param {Number} t: current time（当前时间）
	 * @param {Number} b: beginning value（初始值）
	 * @param {Number} c: change in value（变化量）
	 * @param {Number} d: duration（持续时间）
	 * @memberof utils
	 * @returns {Number} 计算后的数值
	 */
	Ease: {
		linear: function(t, b, c, d) {
			return c * t / d + b;
		},
		//默认速度
		easeIn: function(t, b, c, d) {
			return c * (t /= d) * t * t + b;
		},
		easeOut: function(t, b, c, d) {
			return c * ((t = t / d - 1) * t * t + 1) + b;
		},
		easeInOut: function(t, b, c, d) {
			if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t + 2) + b;
		},
		//快速缓动
		easeInFast: function(t, b, c, d) {
			return c * (t /= d) * t * t * t * t + b;
		},
		easeOutFast: function(t, b, c, d) {
			return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
		},
		easeInOutFast: function(t, b, c, d) {
			if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
			return -c / 2 * ((t -= 2) * t * t * t * t - 2) + b;
		},
		//指数衰减的正弦曲线缓动 超过范围，反弹多次
		easeInElastic: function(t, b, c, d, a, p) {
			let s;
			if (t == 0) return b;
			if ((t /= d) == 1) return b + c;
			if (typeof p == 'undefined') p = d * .3;
			if (!a || a < Math.abs(c)) {
				s = p / 4;
				a = c;
			} else {
				s = p / (2 * Math.PI) * Math.asin(c / a);
			}
			return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		},
		easeOutElastic: function(t, b, c, d, a, p) {
			let s;
			if (t == 0) return b;
			if ((t /= d) == 1) return b + c;
			if (typeof p == 'undefined') p = d * .3;
			if (!a || a < Math.abs(c)) {
				a = c;
				s = p / 4;
			} else {
				s = p / (2 * Math.PI) * Math.asin(c / a);
			}
			return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
		},
		easeInOutElastic: function(t, b, c, d, a, p) {
			let s;
			if (t == 0) return b;
			if ((t /= d / 2) == 2) return b + c;
			if (typeof p == 'undefined') p = d * (.3 * 1.5);
			if (!a || a < Math.abs(c)) {
				a = c;
				s = p / 4;
			} else {
				s = p / (2 * Math.PI) * Math.asin(c / a);
			}
			if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
			return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;

		},
		//超过范围反弹运动 超过范围 反弹一次
		easeInBack: function(t, b, c, d, s) {
			if (typeof s == 'undefined') s = 1.70158;
			return c * (t /= d) * t * ((s + 1) * t - s) + b;
		},
		easeOutBack: function(t, b, c, d, s) {
			if (typeof s == 'undefined') s = 1.70158;
			return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
		},
		easeInOutBack: function(t, b, c, d, s) {
			if (typeof s == 'undefined') s = 1.70158;
			if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
			return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
		},
		//指数衰减的反弹缓动 不会超过范围 反弹多次
		easeInBounce: function(t, b, c, d) {
			return c - this.easeOutBounce(d - t, 0, c, d) + b;
		},
		easeOutBounce: function(t, b, c, d) {
			if ((t /= d) < (1 / 2.75)) {
				return c * (7.5625 * t * t) + b;
			} else if (t < (2 / 2.75)) {
				return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
			} else if (t < (2.5 / 2.75)) {
				return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
			} else {
				return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
			}
		},
		easeInOutBounce: function(t, b, c, d) {
			if (t < d / 2) {
				return this.easeInBounce(t * 2, 0, c, d) * .5 + b;
			} else {
				return this.easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
			}
		}
	},
	getRouterParams: function() {
		let href = window.location.toString();

		let arr = href.split('#');
		let obj = {};
		for (let i = 0; i < arr.length; i++) {

			let item = arr[i];
			let index = item.indexOf('?');
			let str = item.substring(index + 1, item.length);
			let reg = /([^=]+)=([^&]+)&?/g;
			let res = [];
			if (index > -1) {
				while (res = reg.exec(str)) {
					obj[res[1]] = res[2];
				}
				return obj;
			}

		}

		return null;
	},
	/** 
	 * 获取任意指定的时间的 凌晨时间 午夜时间 当前时间 和指定格式话后的时间
	 *  @param {Object} 
	 *      time 原始时间 (可以接受new Date(),毫秒数,秒数)
	 *      type 返回的时间是以秒还是毫秒 true 毫秒 false 秒
	 *      format 指定返回值format中的是时间格式
	 *  @returns {Object} 计算后的数值    
	 *      start 凌晨时间
	 *      end 午夜时间
	 *      format 格式化之后的时间
	 *      now 以毫秒或者秒表示的时间
	 * 
	 */
	getTime({
		time,
		type = true,
		format = 'yyyy/MM/dd hh:mm'
	}) {
		if (!(time instanceof Date)) {
			//毫数
			if ((time + '').length == 10) {
				time = new Date(Number(time) * 1000)
			} else {
				time = new Date(Number(time));
			}

		} else {
			time = new Date(time.getTime());
		}
		if (time.toString() === 'Invalid Date') {
			throw new Error('日期格式错误');;
		}
		let start = time.setHours(0, 0, 0, 0);
		let end = start + 24 * 1000 * 60 * 60 - 1;
		start = !type ? start / 1000 : start;
		end = Math.floor(!type ? end / 1000 : end);
		let forM = this.format(time, format);
		let now = time.getTime();
		now = !type ? now / 1000 : now;
		return {
			start,
			end,
			now,
			format: forM
		};

	},
	/**
	 * 日期对象方法扩展
	 * 
	 * @param {String} fmt yy qq MM dd:hhmmss SS
	 */
	format: function($time, fmt) { //author: meizz 
		if (!($time instanceof Date)) {
			//毫数
			if (($time + '').length == 10) {
				$time = new Date(Number($time) * 1000)
			} else {
				$time = new Date(Number($time));
			}

		}
		let o = {
			'M+': $time.getMonth() + 1, //月份 
			'd+': $time.getDate(), //日 
			'h+': $time.getHours(), //小时 
			'm+': $time.getMinutes(), //分 
			's+': $time.getSeconds(), //秒 
			'q+': Math.floor(($time.getMonth() + 3) / 3), //季度 
			'S': $time.getMilliseconds() //毫秒 
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, ($time.getFullYear() + '').substr(4 - RegExp.$1.length));
		for (let k in o)
			if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
		return fmt;
	},
	/**
	 * @description 指定位置之后插入元素
	 * @function insertDom
	 * @param {dom} newEl 需要插入的节点
	 * @param {Number} targetEl 被插入的节点
	 * @memberof utils
	 */
	insertDom: function(newEl, targetEl) {
		let parentEl = targetEl.parentNode;
		if (parentEl.lastChild == targetEl) {
			parentEl.appendChild(newEl);
		} else {
			parentEl.insertBefore(newEl, targetEl.nextSibling);
		}
	}
}

//将数据类型存储
utils.each('Boolean Number String Function Array Date RegExp Object'.split(' '), function(i, name) {
	classToType['[object ' + name + ']'] = name.toLowerCase();
});
/**
 * @description 浏览器版本信息 .browser 浏览器的型号 .version 浏览器具体的版本
 * @let browserInfo
 * @type {Object} 
 * @memberof utils
 */
utils.browserInfo = {
	'browser': utils.getBrowser(1)[0],
	'version': utils.getBrowser(1)[1]
};
//判断是不是ie8
utils.NotIE8 = !(utils.browserInfo.browser == 'ie' && utils.browserInfo.version == '8');


export default utils;