/* eslint-disable max-len */

import type { ApiLangPack } from '../api/types';
import langPackChineseBasic from './langPackChineseBasic';

const langPackChinesePlus: ApiLangPack = {
  ...langPackChineseBasic,
  New: {
    key: 'New',
    value: '新功能',
  },
  Passcode: {
    key: 'Passcode',
    value: '锁定密码锁定',
  },
  lng_send_action_choose_sticker: {
    key: 'lng_send_action_choose_sticker',
    value: '正在选贴纸',
  },
  'ReportPeer.Report': {
    key: 'ReportPeer.Report',
    value: '报告',
  },
  AttachAudio: {
    key: 'AttachAudio',
    value: '语音消息',
  },
  AttachGif: {
    key: 'AttachGif',
    value: '动图',
  },
  lng_sure_logout: {
    key: 'lng_sure_logout',
    value: '您确定要登出账号吗？',
  },
  'AccountSettings.Logout': {
    key: 'AccountSettings.Logout',
    value: '登出账号',
  },
  FilterDeleteAlert: {
    key: 'FilterDeleteAlert',
    value: '你确定要移除这个文件夹吗？你的聊天不会被删除。',
  },
  OpenUrlTitle: {
    key: 'OpenUrlTitle',
    value: '打开链接',
  },
  OpenUrlAlert2: {
    key: 'OpenUrlAlert2',
    value: '你确定要打开 %1$s?',
  },
  'EmptyChat.Appearance.Light': {
    key: 'EmptyChat.Appearance.Light',
    value: '明亮',
  },
  'EmptyChat.Appearance.Dark': {
    key: 'EmptyChat.Appearance.Dark',
    value: '深色',
  },
  'EmptyChat.Appearance.System': {
    key: 'EmptyChat.Appearance.System',
    value: '跟随系统',
  },
  Theme: {
    key: 'Theme',
    value: '主题',
  },
  Telegram: {
    key: 'Telegram',
    value: 'Telegram',
  },
  lng_settings_disable_night_theme: {
    key: 'lng_settings_disable_night_theme',
    value: '关闭夜间模式',
  },
  DoubleTapSetting: {
    key: 'DoubleTapSetting',
    value: '快速回应',
  },
  'AutoDownloadSettings.Contacts': {
    key: 'AutoDownloadSettings.Contacts',
    value: '联系人',
  },
  'AutoDownloadSettings.PrivateChats': {
    key: 'AutoDownloadSettings.PrivateChats',
    value: '私聊',
  },
  'AutoDownloadSettings.GroupChats': {
    key: 'AutoDownloadSettings.GroupChats',
    value: '群聊',
  },
  'AutoDownloadSettings.Channels': {
    key: 'AutoDownloadSettings.Channels',
    value: '频道',
  },
  AutoDownloadMaxFileSize: {
    key: 'AutoDownloadMaxFileSize',
    value: '最大文件大小',
  },
  'FileSize.MB': {
    key: 'FileSize.MB',
    value: '%@ MB',
  },
  AutodownloadSizeLimitUpTo: {
    key: 'AutodownloadSizeLimitUpTo',
    value: '至多 %1$s',
  },
  'PrivacySettings.WebSessions': {
    key: 'PrivacySettings.WebSessions',
    value: '已登录的网站',
  },
  PrivacyP2P: {
    key: 'PrivacyP2P',
    value: '点对点通话',
  },
  FilterRecommended: {
    key: 'FilterRecommended',
    value: '建议的文件夹',
  },
  Add: {
    key: 'Add',
    value: '添加',
  },
  Weeks: {
    key: 'Weeks',
    oneValue: '%1$d 周',
    otherValue: '%1$d 周',
  },
  Months: {
    key: 'Months',
    oneValue: '%1$d 个月',
    otherValue: '%1$d 个月',
  },
  OtherSessions: {
    key: 'OtherSessions',
    value: '已登录的窗口',
  },
  TerminateOldSessionHeader: {
    key: 'TerminateOldSessionHeader',
    value: '自动关闭旧的窗口',
  },
  IfInactiveFor: {
    key: 'IfInactiveFor',
    value: '如果不活跃时长达到',
  },
  AreYouSureSessions: {
    key: 'AreYouSureSessions',
    value: '您确定要终止所有其他窗口吗？',
  },
  Back: {
    key: 'Back',
    value: '返回',
  },
  'Notification.JoinedChat': {
    key: 'Notification.JoinedChat',
    value: '%@ 加入了群聊',
  },
  SendMessageAsTitle: {
    key: 'SendMessageAsTitle',
    value: '发消息的身份...',
  },
  StartVoipChat: {
    key: 'StartVoipChat',
    value: '开始视频聊天',
  },
  DeleteForAll: {
    key: 'DeleteForAll',
    value: '为所有其他成员删除',
  },
  lng_report_reason_spam: {
    key: 'lng_report_reason_spam',
    value: '垃圾信息',
  },
  lng_report_reason_violence: {
    key: 'lng_report_reason_violence',
    value: '暴力',
  },
  lng_report_reason_pornography: {
    key: 'lng_report_reason_pornography',
    value: '色情',
  },
  lng_report_reason_child_abuse: {
    key: 'lng_report_reason_child_abuse',
    value: '虐童',
  },
  'ReportPeer.ReasonCopyright': {
    key: 'ReportPeer.ReasonCopyright',
    value: '版权',
  },
  lng_report_reason_other: {
    key: 'lng_report_reason_other',
    value: '其他',
  },
  lng_report_reason_description: {
    key: 'lng_report_reason_description',
    value: '描述',
  },
  lng_report_button: {
    key: 'lng_report_button',
    value: '举报',
  },
  lng_channel_add_users: {
    key: 'lng_channel_add_users',
    value: '添加用户',
  },
  lng_context_remove_from_group: {
    key: 'lng_context_remove_from_group',
    value: '从群聊中移除',
  },
  GroupAddMembers: {
    key: 'GroupAddMembers',
    value: '添加成员',
  },
  'Conversation.ScheduleMessage.SendToday': {
    key: 'Conversation.ScheduleMessage.SendToday',
    value: '发送于今天 %@',
  },
  lng_month1: {
    key: 'lng_month1',
    value: '一月',
  },
  lng_month2: {
    key: 'lng_month2',
    value: '二月',
  },
  lng_month3: {
    key: 'lng_month3',
    value: '三月',
  },
  lng_month4: {
    key: 'lng_month4',
    value: '四月',
  },
  lng_month5: {
    key: 'lng_month5',
    value: '五月',
  },
  lng_month6: {
    key: 'lng_month6',
    value: '六月',
  },
  lng_month7: {
    key: 'lng_month7',
    value: '七月',
  },
  lng_month8: {
    key: 'lng_month8',
    value: '八月',
  },
  lng_month9: {
    key: 'lng_month9',
    value: '九月',
  },
  lng_month10: {
    key: 'lng_month10',
    value: '十月',
  },
  lng_month11: {
    key: 'lng_month11',
    value: '十一月',
  },
  lng_month12: {
    key: 'lng_month12',
    value: '十二月',
  },
  lng_weekday1: {
    key: 'lng_weekday1',
    value: '周一',
  },
  lng_weekday2: {
    key: 'lng_weekday2',
    value: '周二',
  },
  lng_weekday3: {
    key: 'lng_weekday3',
    value: '周三',
  },
  lng_weekday4: {
    key: 'lng_weekday4',
    value: '周四',
  },
  lng_weekday5: {
    key: 'lng_weekday5',
    value: '周五',
  },
  lng_weekday6: {
    key: 'lng_weekday6',
    value: '周六',
  },
  lng_weekday7: {
    key: 'lng_weekday7',
    value: '周日',
  },
  Reactions: {
    key: 'Reactions',
    value: '回应',
  },
  'GroupInfo.InviteLinks': {
    key: 'GroupInfo.InviteLinks',
    value: '邀请链接',
  },
  Loading: {
    key: 'Loading',
    value: '加载中...',
  },
  EditAdminPromotedBy: {
    key: 'EditAdminPromotedBy',
    value: '由 %1$s 设为管理员',
  },
  'Channel.Management.AddModerator': {
    key: 'Channel.Management.AddModerator',
    value: '添加管理员',
  },
  StartVoipChatPermission: {
    key: 'StartVoipChatPermission',
    value: '管理视频聊天',
  },
  EditAdminRemoveAdmin: {
    key: 'EditAdminRemoveAdmin',
    value: '删除管理员',
  },
  'Channel.Admin.Dismiss': {
    key: 'Channel.Admin.Dismiss',
    value: '删除管理员',
  },
  'Show Message': {
    key: '显示消息',
  },
  lng_media_audio_empty: {
    key: 'lng_media_audio_empty',
    value: '这里还没有语音消息',
  },
  AreYouSureDeleteAndExit: {
    key: 'AreYouSureDeleteAndExit',
    value: '你确定删除并退出群聊吗？',
  },
  lng_media_song_empty: {
    key: 'lng_media_song_empty',
    value: '这里还没有音乐文件',
  },
  CreateNewContact: {
    key: 'CreateNewContact',
    value: '创建新联系人',
  },
  'Schedule.SendWhenOnline': {
    key: 'Schedule.SendWhenOnline',
    value: '在线时发送',
  },
  SharedGroupsTab2: {
    key: 'SharedGroupsTab2',
    value: '群聊',
  },
  'Conversation.EmptyPlaceholder': {
    key: 'Conversation.EmptyPlaceholder',
    value: '这里还没有消息...',
  },
  'Conversation.GreetingText': {
    key: 'Conversation.GreetingText',
    value: '发送信息或点击下面的问候语。',
  },
  lng_media_file_empty: {
    key: 'lng_media_file_empty',
    value: '这里还没有文件',
  },
  'Weekday.Sunday': {
    key: 'Weekday.Sunday',
    value: '星期天',
  },
  HistoryCleared: {
    key: 'HistoryCleared',
    value: '历史记录已清除',
  },
  'Custom.ReportBug': {
    key: 'Custom.ReportBug',
    value: '报告漏洞',
  },
  'Custom.InstallApp': {
    key: 'Custom.InstallApp',
    value: '安装 APP',
  },
  WhoCanCallMe: {
    key: 'WhoCanCallMe',
    value: '谁能给我打电话?',
  },
};

export default langPackChinesePlus;
