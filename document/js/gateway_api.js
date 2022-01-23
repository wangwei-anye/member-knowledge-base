var gateway_apiData = {"openapi":"3.0.1","info":{"title":"会员 Saas 网关系统　Member Gateway API","description":"\n--------\n[knowledge base]\n\n## 验证逻辑\n\n### 普通请求校验\n\n普通请求会检查：\n1. Signature 是否是使用我们颁发的secret加密\n2. x-app-key 是否为后端颁发的app_key\n3. Origin 是否为网关颁发的域名\n\n在请求的代理过程中，如果所有校验都通过，那么，网关会把Signature中的payload的所有字段取出，然后重新签名并写入到Authorization中（注意，此Authorization和登录校验的Authorization不是同一个），继续请求到后端。\n\n### 需要登录请求校验\n\n除了上述的普通请求校验，登录请求校验会多校验一个`Authorization`（登录接口颁发的`access-token`），校验成功后，会把`exp`和`account-id`这两个参数添加到Signature中的payload中，重新签名并添加到Authorization中，继续请求到后端。\n\n| 参数名称 | 示例 | 参数描述              |\n| ------- | -------- | ---------------------|\n| session-account-id | 10000001 |此参数会附加在Signature中的payload中，重新签名并添加到`Authorization`中 |\n\n--------\n","version":"1.0.1"},"servers":[{"url":"https://member-api-gateway.01member.com"}],"components":{"schemas":{"Config":{"type":"object","description":"项目配置信息","properties":{"path_prefix":{"type":"string","description":"项目配置前缀","value":"/member/api"}}},"Kicker_data":{"type":"object","description":"踢除客户端信息","properties":{"ttl":{"type":"integer","description":"此access-token剩余时间","example":7152},"kicker":{"type":"string","description":"t出的access-token","example":"m4A62oqQMN11FD41"},"kicker_time":{"type":"integer","description":"被t出的时间","example":1563871983}}},"Heartbeat":{"type":"object","description":"心跳返回信息","properties":{"ttl":{"type":"integer","description":"此access-token剩余时间","example":7152},"kicker":{"type":"string","description":"t出的access-token","example":"m4A62oqQMN11FD41"},"kicker_time":{"type":"integer","description":"被t出的时间","example":1563871983}}},"Off_line":{"type":"object","description":"下线信息","properties":{"del_session_nums":{"type":"integer","description":"总共被下线了几个端","example":3}}},"Init":{"type":"object","description":"初始化返回信息","properties":{"token_key":{"type":"string","description":"public_key","example":"LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JR0pBb0dCQUxaRVZMS01ZbEJFUm1kOUhTS3lObVBaUytPblZQMmpsWTVXQUdqZFNqRXFNRkhadmxYSmlZK1UKa1VRSXlCWlRrMExHTGg5SzRxRDRoOWFpNDl1R0t3a3dLTmw2SlRDOUxPM0lkUHQzNVFuaG1VUFNuZTdvU2QvVwpmVW5kMndWeHJxMjM5a2dKZUg0OUl4cjdFMkNPcVp1d1dsNldRSG44RVpFTGg5ZUNqcHJ0QWdNQkFBRT0KLS0tLS1FTkQgUlNBIFBVQkxJQyBLRVktLS0tLQo="}}},"Manage":{"type":"object","description":"管理app返回信息","properties":{"id":{"type":"integer","description":"添加之后的id","example":3},"affect_num":{"type":"integer","description":"作用了几个","example":3}}},"ErrorCode":{"description":"| 错误码 | 是否展示| 简体中文文案（示例）  | 说明 |\n| ----- | ----- | ---------- | ---- |\n| 2000 | 是 | 服务异常，请稍后再试 | 登录请求header中没有 content-type |\n| 2001 | 是 | 服务异常，请稍后再试 | 登录请求header中的 content-type 不支持\n| 2002 | 是 | 登录超时，请重新登录  | 发送登录请求失败\n| 2003 | 是 | 服务异常，请稍后再试 | 登录请求header参数错误\n| 2004 | 是 | 服务异常，请稍后再试 | 登录请求内部错误\n| 2101 | 是 | 服务异常，请稍后再试 | 登出请求refresh-token找不到\n| 2102 | 是 | 服务异常，请稍后再试 | 登出请求x-api-key找不到\n| 2103 | 是 | 服务异常，请稍后再试 | 登出请求refresh-token中无法获取account_id\n| 2104 | 是 | 服务异常，请稍后再试 | 登出请求找不到session-group组\n| 2105 | 是 | 服务异常，请稍后再试 | 登出发出记录请求失败\n| 2106 | 是 | 服务异常，请稍后再试 | stateless登出失败\n| 2107 | 是 | 服务异常，请稍后再试 | stateful登出失败\n| 2110 | 是 | 服务异常，请稍后再试 | protobuf common.pb文件无法找到或错误\n| 2201 | 是 | 服务异常，请稍后再试 | 登录态验证header中没有Authorization参数\n| 2202 | 是 | 服务异常，请稍后再试 | 登录态失效\n| 2203 | 是 | 服务异常，请稍后再试 | 登录态验证中无状态jwt字符串错误\n| 2204 | 是 | 服务异常，请稍后再试 | 登录态验证中无状态jwt字符串密钥验证错误\n| 2205 | 是 | 服务异常，请稍后再试 | 登录态验证中无状态jwt字符串过期\n| 2206 | 是 | 服务异常，请稍后再试 | 用户登录态黑名单检验错误(无account_id)\n| 2207 | 是 | 服务异常，请稍后再试 | 用户登录态在黑名单中\n| 2208 | 是 | 账号被登出，请重新登录 | 登录态失效(被踢掉)\n| 2301 | 是 | 服务异常，请稍后再试 | 请求header中没有x-api-key\n| 2302 | 是 | 服务异常，请稍后再试 | 请求中x-api-key无法找到\n| 2303 | 是 | 服务异常，请稍后再试 | 请求中x-api-key没有app_group\n| 2304 | 是 | 服务异常，请稍后再试 | 请求域名origin domains不在允许列表中\n| 2305 | 是 | 服务异常，请稍后再试 | 请求header中没有Signature\n| 2306 | 是 | 服务异常，请稍后再试 | 请求header中Signature为无法识别的jwt字符串\n| 2307 | 是 | 服务异常，请稍后再试 | 请求header中Signature错误\n| 2308 | 是 | 服务异常，请稍后再试 | 请求header中Signature错误\n| 2309 | 是 | 服务异常，请稍后再试 | 请求header中Signature错误\n| 2310 | 是 | 服务异常，请稍后再试 | 请求header中Signature为无法识别的jwt字符串\n| 2311 | 是 | 服务异常，请稍后再试 | 请求header中Signature错误(payload中无iss)\n| 2312 | 是 | 服务异常，请稍后再试 | 请求header中Signature错误(secret错误)\n| 2313 | 是 | 服务异常，请稍后再试 | 请求header中Signature错误(algorithm错误)\n| 2315 | 是 | 服务异常，请稍后再试 | 请求header中Signature错误(exp错误)\n| 2316 | 是 | 服务异常，请稍后再试 | 请求header中Signature错误(exp错误)\n| 2317 | 是 | 服务异常，请稍后再试 | 请求header中Signature校验失败\n| 2318 | 是 | 服务异常，请稍后再试 | 请求header中Signature的payload中device_type无法找到\n| 2319 | 是 | 服务异常，请稍后再试 | 请求header中Signature的payload中device_type不在允许的列表中\n| 2361 | 是 | 服务异常，请稍后再试 | request-check链接redis错误\n| 2400 | 是 | 服务异常，请稍后再试 | 刷新access-token请求找不到refresh-token\n| 2401 | 是 | 服务异常，请稍后再试 | 刷新access-token请求header中没有refresh-token\n| 2402 | 是 | 服务异常，请稍后再试 | 刷新access-token请求中refresh-token失效\n| 3060 | 是 | 服务异常，请稍后再试 | clean-up 无法获取session-group组\n| 3061 | 否 | 服务异常，请稍后再试 | clean-up 错误\n| 3101 | 是 | 服务异常，请稍后再试 | 心跳请求header中没有Authorization参数\n| 3201 | 是 | 服务异常，请稍后再试 | client-kicked无请求体\n| 3202 | 是 | 服务异常，请稍后再试 | client-kicked account_id  device_type  app_key  请求参数错误\n| 3203 | 是 | 服务异常，请稍后再试 | client-kicked 没有找到登录态\n| 3300 | 是 | 服务异常，请稍后再试 | 下线请求中没有account_id参数\n| 3301 | 是 | 服务异常，请稍后再试 | 下线失败\n| 3401 | 否 | 服务异常，请稍后再试 | manage-app请求 app_key field must be set 或者 primary key id can not be null\n| 3402 | 否 | 服务异常，请稍后再试 | manage-app请求 group_id field must be set\n| 3403 | 否 | 无 | manage-app请求 language must be set to one of the following: zh-Hans-CN, zh-Hant-HK, en\n| 3404 | 否 | 无 | manage-app请求 app key already exists\n| 3405 | 否 | 无 | manage-app请求 group_id does not exist\n| 3406 | 否 | 无 | manage-app请求 内部错误\n| 3407 | 否 | 无 | manage-app请求 act错误\n| 3408 | 否 | 无 | manage-app请求 id does not exist\n| 3471 | 否 | 无 | manage-app请求 postgres无法连接\n| 3472 | 否 | 无 | manage-app请求 postgres错误\n| 3473 | 否 | 无 | manage-app请求 app_config 查询失败(postgres错误)\n| 3474 | 否 | 无 | manage-app请求 app_group_config 查询失败(postgres错误)\n| 3501 | 否 | 无 | manage-app-grpup请求 token_key_pair is not valid json\n| 3502 | 否 | 无 | manage-app-grpup请求 concurrent_limit is not valid json\n| 3503 | 否 | 无 | manage-app-grpup请求 parameter token_policy error\n| 3504 | 否 | 无 | manage-app-grpup请求 primary key id can not be null\n| 3506 | 否 | 无 | manage-app-grpup请求 内部错误，不支持的act\n| 3507 | 否 | 无 | manage-app-grpup请求 内部错误，act缺失\n| 3508 | 否 | 无 | manage-app-grpup请求 id does not exist\n| 3571 | 否 | 无 | manage-app-grpup请求 pg链接错误\n| 3601 | 否 | 无 | health-check 无法链接 redis\n| 3602 | 否 | 无 | health-check 无法发送 rabbitmq\n| 3603 | 否 | 无 | health-check 无法链接 postgres\n| 3604 | 否 | 无 | health-check postgres 数据库内配置缺失(通常是初始化失败)\n| 3605 | 否 | 无 | health-check postgres global 数据库配置缺失，初始化表应该有3条数据，小于3就错误\n| 3606 | 否 | 无 | health-check 非法的host 只能使用 `localhost` 或者 `127.0.0.1`\n| 3700 | 是 | 服务被关闭，请联系管理员  | enable 被关闭\n| 3701 | 否 | 无 | enable 参数错误.没有找到enable参数\n| 3702 | 否 | 无 | enable 内部错误，获取内部config错误\n| 3703 | 否 | 无 | enable 查询pg内部错误\n| 3704 | 否 | 无 | enable x-service-data参数错误\n| 3705 | 否 | 无 | enable 参数错误，参数的值非json\n| 3706 | 否 | 无 | enable 参数错误，参数的值json键值对不符合规范\n| 3801 | 是 | 服务被关闭，请联系管理员 | init 无法获取 global_config token_key_pair\n| 3802 | 是 | 服务异常，请稍后再试 | init 生成ex密钥对 私钥 错误\n| 3803 | 是 | 无 | init 生成ex密钥对 公钥 错误\n| 3804 | 是 | 服务异常，请稍后再试 | init 参数tenant_id 缺失\n| 3805 | 是 | 服务异常，请稍后再试 | init 创建公私钥错误\n| 3806 | 是 | 服务异常，请稍后再试 | init 公私钥入库失败\n"}}},"paths":{"/v1/account/login":{"post":{"tags":["Public","Backend"],"summary":"登录接口","description":"登录接口，此接口会员账号系统中已经存在，此接口代理账号系统中的\"登录\"接口，请求参数无差别传入账号系统\"登录\"接口，具体的请求参数可以参考 member-account-system-kit 中的 login接口。","responses":{"200":{"description":"Successful","headers":{"access-token":{"schema":{"type":"string"},"description":"获取新的access-token."},"refresh-token":{"schema":{"type":"string"},"description":"获取新的refresh-token."}},"content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"integer"},"message":{"type":"string"},"data":{"type":"object"}}}}}}}}},"/v1/account":{"post":{"tags":["Public","Backend"],"summary":"创建会员接口","description":"此接口会员账号系统中已经存在，此接口代理账号系统中的\"创建会员\"接口，请求参数无差别传入账号系统\"创建会员\"接口。具体的请求参数可以参考 member-member-account-system-kit 中的 POST:account 接口。","responses":{"200":{"description":"Successful","headers":{"access-token":{"schema":{"type":"string"},"description":"获取新的access-token."},"refresh-token":{"schema":{"type":"string"},"description":"获取新的refresh-token."}},"content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"integer"},"message":{"type":"string"},"data":{"type":"object"}}}}}}}}},"/v1/frontend/account/login":{"post":{"tags":["Public","Frontend"],"summary":"登录接口","description":"登录接口，此接口会员账号系统中已经存在，此接口代理账号系统中的\"登录\"接口，请求参数无差别传入账号系统\"登录\"接口，具体的请求参数可以参考 member-account-system-kit 中的 login接口。","responses":{"200":{"description":"Successful","headers":{"access-token":{"schema":{"type":"string"},"description":"获取新的access-token."},"refresh-token":{"schema":{"type":"string"},"description":"获取新的refresh-token."}},"content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"integer"},"message":{"type":"string"},"data":{"type":"object"}}}}}}}}},"/v1/frontend/account/register":{"post":{"tags":["Public","Frontend"],"summary":"创建会员接口","description":"此接口会员账号系统中已经存在，此接口代理账号系统中的\"创建会员\"接口，请求参数无差别传入账号系统\"创建会员\"接口。具体的请求参数可以参考 member-member-account-system-kit 中的 POST:account 接口。","responses":{"200":{"description":"Successful","headers":{"access-token":{"schema":{"type":"string"},"description":"获取新的access-token."},"refresh-token":{"schema":{"type":"string"},"description":"获取新的refresh-token."}},"content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"integer"},"message":{"type":"string"},"data":{"type":"object"}}}}}}}}},"/v1/account/logout":{"post":{"tags":["Public","Backend"],"summary":"登出接口","description":"登出接口","parameters":[{"name":"Authorization","in":"header","description":"登录接口颁发的access-token参数（需要添加Bearer 前缀）","schema":{"type":"string"}},{"name":"refresh-token","in":"header","description":"登录接口颁发的refresh-token参数","schema":{"type":"string"}}],"responses":{"200":{"description":"登出成功","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"integer"},"message":{"type":"string"}}}}}}}}},"/v1/account/refresh_token":{"post":{"tags":["Public","Backend"],"summary":"刷新access-token接口","description":"刷新access-token接口","parameters":[{"name":"refresh-token","in":"header","description":"登录接口颁发的refresh-token参数","schema":{"type":"string"}}],"responses":{"200":{"description":"Successful","headers":{"access-token":{"schema":{"type":"string"},"description":"获取新的access-token."}},"content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"integer"},"message":{"type":"string"},"data":{"type":"object"}}}}}}}}},"/v1/account/heartbeat":{"get":{"tags":["Public","Backend"],"summary":"心跳接口","description":"心跳接口","parameters":[{"name":"Authorization","in":"header","description":"登录接口颁发的access-token参数（需要添加Bearer 前缀）","schema":{"type":"string"}}],"responses":{"200":{"description":"Successful","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"integer"},"message":{"type":"string"},"data":{"$ref":"#/components/schemas/Heartbeat"}}}}}}}}},"/v1/frontend/account/logout":{"post":{"tags":["Public","Frontend"],"summary":"登出接口","description":"登出接口","parameters":[{"name":"Authorization","in":"header","description":"登录接口颁发的access-token参数（需要添加Bearer 前缀）","schema":{"type":"string"}},{"name":"refresh-token","in":"header","description":"登录接口颁发的refresh-token参数","schema":{"type":"string"}}],"responses":{"200":{"description":"登出成功","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"integer"},"message":{"type":"string"}}}}}}}}},"/v1/frontend/account/refresh_token":{"post":{"tags":["Public","Frontend"],"summary":"刷新access-token接口","description":"刷新access-token接口","parameters":[{"name":"refresh-token","in":"header","description":"登录接口颁发的refresh-token参数","schema":{"type":"string"}}],"responses":{"200":{"description":"Successful","headers":{"access-token":{"schema":{"type":"string"},"description":"获取新的access-token."}},"content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"integer"},"message":{"type":"string"},"data":{"type":"object","properties":{}}}}}}}}}},"/v1/frontend/account/heartbeat":{"get":{"tags":["Public","Frontend"],"summary":"心跳接口","description":"心跳接口","parameters":[{"name":"Authorization","in":"header","description":"登录接口颁发的access-token参数（需要添加Bearer 前缀）","schema":{"type":"string"}}],"responses":{"200":{"description":"Successful","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"integer"},"message":{"type":"string"},"data":{"$ref":"#/components/schemas/Kicker_data"}}}}}}}}},"/v1/account/off_line":{"get":{"tags":["Internal"],"summary":"强制下线接口","description":"强制下线接口","parameters":[{"name":"Authorization","in":"header","description":"登录接口颁发的access-token参数（需要添加Bearer 前缀）","schema":{"type":"string"}},{"name":"account_id","in":"query","description":"需要强制已下线的account_id","schema":{"type":"interger"}}],"responses":{"200":{"description":"Successful","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"integer"},"message":{"type":"string"},"data":{"$ref":"#/components/schemas/Off_line"}}}}}}}}},"/v1/account/client_kicked":{"post":{"tags":["Internal"],"summary":"强制下线端接口","description":"强制下线端接口","requestBody":{"content":{"application/x-www-form-urlecoded":{"schema":{"type":"object","properties":{"account_id":{"type":"interger","description":"要t出的用户","example":100051},"device_type":{"type":"string","description":"要强制下线的端","example":"app.android"}},"required":["account_id","device_type"]}}}},"responses":{"200":{"description":"Successful","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"integer"},"message":{"type":"string"},"data":{"type":"object"}}}}}}}}},"/v1/account/third_party_login":{"post":{"tags":["Public","Backend"],"summary":"第三方登录接口","description":"三方登录接口,此接口为三方登录使用，如果传入了access-token那么，网关会验证此token并转换为session-account-id，如果没有access-token，就执行到后端的登录逻辑。","parameters":[{"name":"Authorization","in":"header","description":"登录接口颁发的access-token参数（需要添加Bearer 前缀）","schema":{"type":"string"}}],"responses":{"200":{"description":"Successful","headers":{"access-token":{"schema":{"type":"string"},"description":"如果request header中没有传入access-token，则会返回此参数"},"refresh-token":{"schema":{"type":"string"},"description":"如果request header中没有传入access-token，则会返回此参数"}},"content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"integer"},"message":{"type":"string"},"data":{"type":"object"}}}}}}}}},"/v1/enable":{"post":{"tags":["Internal"],"summary":"冻结租户接口","description":"传入是否冻结，如果冻结，直接所有接口不可访问","requestBody":{"content":{"application/x-www-form-urlecoded":{"schema":{"type":"object","properties":{"enable":{"type":"json","description":"json类型，对应的系统是否停用。json的key必须是`member`,`points`,`card`,`coupon`,`marketing`,`risk-control`，`value`只能是`enable`和`disable`","example":"{\"member\":\"enable\", \"points\":\"enable\", \"card\":\"enable\", \"coupon\":\"enable\", \"marketing\":\"enable\", \"risk-control\":\"enable\"}"}},"required":["enable"]}}}},"responses":{"200":{"description":"Successful","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"integer"},"message":{"type":"string"},"data":{"type":"object"}}}}}}}}},"/v1/init":{"post":{"tags":["Internal"],"summary":"初始化接口","description":"初始化获取public_token接口","parameters":[{"name":"tenant_id","in":"query","description":"租户id，必须字段","schema":{"type":"interger"}}],"responses":{"200":{"description":"Successful","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"integer"},"message":{"type":"string"},"data":{"$ref":"#/components/schemas/Init"}}}}}}}}},"/v1/account/manage_app":{"post":{"tags":["Internal"],"summary":"APP配置管理接口","description":"APP配置管理接口","parameters":[{"in":"header","name":"From-Saas","description":"是否saas请求","required":true,"schema":{"type":"boolean"}}],"requestBody":{"content":{"application/x-www-form-urlecoded":{"schema":{"type":"object","properties":{"act":{"type":"string","description":"操作类型 查询：get | 新增：add | 修改：modify | 删除：remove","example":"get"},"app_key":{"type":"string","description":"app唯一标识","example":"xxxxxxxxxxxx"},"language":{"type":"string","description":"国际化语言，只能是以下其中之一的值：zh-Hans-CN, zh-Hant-HK, en","example":"zh-Hans-CN"},"allow_origin_domains":{"type":"string","description":"限制登录域名, Request Http Header 中的 origin","example":"http://www.icbc.com,http://www.china.com"},"description":{"type":"string","description":"描述","example":"xxxxx"},"group_id":{"type":"int","description":"所属APP Group ID","example":1},"name":{"type":"string","description":"app 名称","example":"酒店"},"id":{"type":"int","description":"修改：modify & 查询：get　& 删除：remove 时候使用","example":2}},"required":["act","app_key","language","group_id"]}}}},"responses":{"200":{"description":"Successful","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"integer"},"message":{"type":"string"},"data":{"$ref":"#/components/schemas/Manage"}}}}}}}}},"/v1/account/manage_app_group":{"post":{"tags":["Internal"],"summary":"APP Group 管理接口","description":"APP Group 管理接口","parameters":[{"in":"header","name":"From-Saas","description":"是否saas请求","required":true,"schema":{"type":"boolean"}}],"requestBody":{"content":{"application/x-www-form-urlecoded":{"schema":{"type":"object","properties":{"is_create_token_key":{"type":"string","description":"是否新建token_key_pair，注意这里是string字符串，不是boolen true|false","example":"true"},"act":{"type":"string","description":"操作类型 查询：get | 新增：add | 修改：modify | 删除：remove","example":"get"},"token_policy":{"type":"string","description":"token策略, stateless:无状态 | stateful:有状态 | semi-state:有状态+无状态校验","example":"semi-state"},"token_key":{"type":"string","description":"semi-state和stateless,需要公私钥,但此值可不传(会去查询global_conf), 值为base64后的值","example":"LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUZrd0V3WUhLb1pJemowQ0FRWUlLb1pJemowREFRY0RRZ0FFbEFSbE1zM21CNENsUXhRRWhDS0Zua2R4QTVzUApvcTcxWFBMUU53LzRLQ0s5OUJvMkNBek1ZSmVoMndlb0ZQREJpQktsYm5CMjZkdjZRVURuRnJQUUpnPT0KLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg=="},"concurrent_limit":{"type":"string","description":"客户端登录数量限制","example":""},"description":{"type":"string","description":"描述","example":"xxxxx"},"id":{"type":"int","description":"修改：modify & 查询：get　& 删除：remove 时候使用","example":"2feiqi"}},"required":["act","stateless_token","token_policy"]}}}},"responses":{"200":{"description":"Successful","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"integer"},"message":{"type":"string"},"data":{"$ref":"#/components/schemas/Manage"}}}}}}}}},"/v1/health_check":{"get":{"tags":["Internal"],"summary":"内部检测接口","description":"检测是否服务健康（注意，此接口只在localhost时候可以调用）","parameters":[{"name":"readiness","in":"query","description":"基础检测： 0表示不执行，1表示执行","schema":{"type":"interger"}},{"name":"liveness","in":"query","description":"基础检测+逻辑检测： 0表示不执行，1表示执行","schema":{"type":"interger"}}],"responses":{"200":{"description":"Successful","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"integer"},"message":{"type":"string","example":"success"}}}}}}}}}}}