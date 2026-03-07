import { NextResponse } from 'next/server';
import type { HomeSummary } from '@/lib/types';

export async function GET() {
  const payload: HomeSummary = {
    latestThread: {
      title: 'نقاش: تحسين تجربة الأعضاء الجدد',
      href: '/forum/t/1001-welcome-flow',
      meta: 'منذ 12 دقيقة'
    },
    latestPost: {
      title: 'ملخص جلسة المجتمع الأسبوعية',
      href: '/social/p/501',
      meta: 'منذ 20 دقيقة'
    },
    latestArticle: {
      title: 'إطلاق تحديثات لوحة الأخبار',
      href: '/news/a/901-news-update',
      meta: 'منذ 35 دقيقة'
    },
    updates: [
      { id: 'u1', type: 'forum.reply.created', actor: 'سارة', time: '2m', target_title: 'رد جديد في موضوع الترحيب', target_url: '/forum/t/1001-welcome-flow', pinned: true },
      { id: 'u2', type: 'social.post.like.created', actor: 'عبدالله', time: '4m', target_title: 'إعجاب جديد على منشورك', target_url: '/social/p/501' },
      { id: 'u3', type: 'news.article.published', actor: 'هيئة التحرير', time: '8m', target_title: 'خبر جديد منشور الآن', target_url: '/news/a/901-news-update', featured: true },
      { id: 'u4', type: 'moderation.action.taken', actor: 'مشرف', time: '14m', target_title: 'إجراء إشرافي على موضوع', target_url: '/forum/t/1001-welcome-flow' },
      { id: 'u5', type: 'badge.earned', actor: 'ليان', time: '18m', target_title: 'وسام جديد في ملف العضو', target_url: '/u/layan' },
      { id: 'u6', type: 'forum.thread.shared_to_social', actor: 'أحمد', time: '26m', target_title: 'مشاركة موضوع إلى المنصة', target_url: '/social/p/501' }
    ],
    unreadDots: { forum: true, social: true, news: false }
  };

  return NextResponse.json(payload);
}
