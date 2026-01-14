import random
import sys
import json
import os

# 日语50音图平假名与罗马音映射

# 清音 - 基础假名
seion_map = {
    'あ': 'a',   'い': 'i',   'う': 'u',   'え': 'e',   'お': 'o',
    'か': 'ka',  'き': 'ki',  'く': 'ku',  'け': 'ke',  'こ': 'ko',
    'さ': 'sa',  'し': 'shi', 'す': 'su',  'せ': 'se',  'そ': 'so',
    'た': 'ta',  'ち': 'chi', 'つ': 'tsu', 'て': 'te',  'と': 'to',
    'な': 'na',  'に': 'ni',  'ぬ': 'nu',  'ね': 'ne',  'の': 'no',
    'は': 'ha',  'ひ': 'hi',  'ふ': 'fu',  'へ': 'he',  'ほ': 'ho',
    'ま': 'ma',  'み': 'mi',  'む': 'mu',  'め': 'me',  'も': 'mo',
    'や': 'ya',  'ゆ': 'yu',  'よ': 'yo',
    'ら': 'ra',  'り': 'ri',  'る': 'ru',  'れ': 're',  'ろ': 'ro',
    'わ': 'wa',  'を': 'o',   'ん': 'n',
}

# 浊音
dakuon_map = {
    'が': 'ga',  'ぎ': 'gi',  'ぐ': 'gu',  'げ': 'ge',  'ご': 'go',
    'ざ': 'za',  'じ': 'ji',  'ず': 'zu',  'ぜ': 'ze',  'ぞ': 'zo',
    'だ': 'da',  'ぢ': 'ji',  'づ': 'zu',  'で': 'de',  'ど': 'do',
    'ば': 'ba',  'び': 'bi',  'ぶ': 'bu',  'べ': 'be',  'ぼ': 'bo',
}

# 半浊音
handakuon_map = {
    'ぱ': 'pa',  'ぴ': 'pi',  'ぷ': 'pu',  'ぺ': 'pe',  'ぽ': 'po',
}

# 拗音
youon_map = {
    # か行拗音
    'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
    # が行拗音
    'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
    # さ行拗音
    'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
    # ざ行拗音
    'じゃ': 'ja',  'じゅ': 'ju',  'じょ': 'jo',
    # た行拗音
    'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
    # だ行拗音
    'ぢゃ': 'ja',  'ぢゅ': 'ju',  'ぢょ': 'jo',
    # な行拗音
    'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
    # は行拗音
    'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
    # ば行拗音
    'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
    # ぱ行拗音
    'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo',
    # ま行拗音
    'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
    # ら行拗音
    'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
}

# 练习范围选项
practice_ranges = {
    '1': ('清音', seion_map),
    '2': ('浊音', dakuon_map),
    '3': ('半浊音', handakuon_map),
    '4': ('拗音', youon_map),
    '5': ('全部', {**seion_map, **dakuon_map, **handakuon_map, **youon_map}),
}

# 统计文件路径
STATS_FILE = os.path.join(os.path.dirname(__file__), 'hiragana_stats.json')

def load_stats():
    """加载统计记录"""
    if os.path.exists(STATS_FILE):
        try:
            with open(STATS_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except:
            pass
    return {}

def save_stats(stats):
    """保存统计记录"""
    with open(STATS_FILE, 'w', encoding='utf-8') as f:
        json.dump(stats, f, ensure_ascii=False, indent=2)

def display_stats(stats):
    """显示统计信息"""
    if not stats:
        print("\n暂无练习记录")
        return
    
    print("\n" + "="*60)
    print("单个假名正确率统计")
    print("="*60)
    
    # 按正确率排序
    sorted_stats = sorted(stats.items(), key=lambda x: x[1]['correct_rate'], reverse=True)
    
    for char, data in sorted_stats:
        total = data['total']
        correct = data['correct']
        rate = data['correct_rate']
        
        # 根据正确率显示不同标记
        if rate >= 90:
            mark = "★"
        elif rate >= 70:
            mark = "●"
        elif rate >= 50:
            mark = "○"
        else:
            mark = "△"
        
        print(f"{mark} {char:4s} - {correct:2d}/{total:2d} = {rate:5.1f}%")
    
    print("="*60)

def reset_stats():
    """重置统计数据"""
    if os.path.exists(STATS_FILE):
        os.remove(STATS_FILE)
        print("✓ 统计数据已重置")
    else:
        print("暂无统计数据")

def select_practice_range():
    """选择练习范围"""
    print("\n请选择练习范围：")
    print("-" * 40)
    for key, (name, _) in practice_ranges.items():
        print(f"{key}. {name} ({len(practice_ranges[key][1])}个)")
    print("r. 重置统计数据")
    print("q. 退出程序")
    print("-" * 40)
    
    while True:
        choice = input("\n请输入选项：").strip().lower()
        
        if choice == 'q':
            print("再见！")
            sys.exit(0)
        elif choice == 'r':
            reset_stats()
            continue
        elif choice in practice_ranges:
            range_name, range_map = practice_ranges[choice]
            print(f"\n已选择：{range_name}（共{len(range_map)}个假名）")
            return range_name, range_map
        else:
            print("无效选项，请重新输入")

def practice_hiragana():
    print("""
    ┌───────────────────────┐
    │      日语50音学习程序     │
    └───────────────────────┘
    """)
    
    # 选择练习范围
    range_name, hiragana_map = select_practice_range()
    
    # 加载统计记录
    stats = load_stats()
    
    # 初始化待练习的假名列表
    remaining_chars = list(hiragana_map.keys())
    random.shuffle(remaining_chars)
    
    print(f"\n开始练习！输入罗马音后按回车")
    print(f"输入 'quit' 退出练习 | 输入 'stats' 查看统计")
    print(f"输入 'reset' 重置当前范围统计\n")
    
    while True:
        # 如果所有假名都练习过了，重新开始
        if not remaining_chars:
            display_stats(stats)
            print("\n🔄 所有的假名都练习过一遍，重新开始！")
            remaining_chars = list(hiragana_map.keys())
            random.shuffle(remaining_chars)
        
        # 随机选择假名
        question = remaining_chars.pop()
        correct_answer = hiragana_map[question]
        
        # 输入处理
        try:
            print(f"请输入 '{question}' 的罗马音：", end='', flush=True)
            user_input = sys.stdin.readline().strip().lower()
            
            if user_input == 'quit':
                print("\n练习结束，感谢使用！")
                display_stats(stats)
                break
            elif user_input == 'stats':
                display_stats(stats)
                remaining_chars.append(question)
                continue
            elif user_input == 'reset':
                # 重置当前范围的统计数据
                for char in hiragana_map:
                    if char in stats:
                        del stats[char]
                save_stats(stats)
                print("✓ 当前范围统计已重置\n")
                remaining_chars = list(hiragana_map.keys())
                random.shuffle(remaining_chars)
                continue
            elif not user_input:
                raise EOFError
                
        except EOFError:
            print("\n⚠️ 输入中断，请确保在终端中运行程序")
            return
        
        # 初始化该假名的统计数据
        if question not in stats:
            stats[question] = {'total': 0, 'correct': 0}
        
        # 更新统计数据
        stats[question]['total'] += 1
            
        # 答案验证
        if user_input == correct_answer:
            print("✓ 正确！\n")
            stats[question]['correct'] += 1
        else:
            print(f"✗ 错误！正确答案：{correct_answer}\n")
        
        # 计算正确率
        stats[question]['correct_rate'] = round(stats[question]['correct'] / stats[question]['total'] * 100, 1)
        
        # 保存统计数据
        save_stats(stats)

if __name__ == "__main__":
    random.seed(a=None, version=2)
    practice_hiragana()
