import { Component, Input, OnInit } from '@angular/core';
import { BarStatsType } from '../../../../models/pokemon.type';
import { stats } from '../../../../models/pokemon.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bar-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bar-stats.component.html',
  styleUrl: './bar-stats.component.scss',
})
export class BarStatsComponent implements OnInit {
  @Input() statsCurrent: stats = { base_stat: 0, stat: { name: '', url: '' } };
  @Input() color: string = 'red';

  progress: number = 0;

  private stats: Array<{ type: BarStatsType; maxValue: number }> = [
    {
      type: 'hp',
      maxValue: 190,
    },
    {
      type: 'attack',
      maxValue: 190,
    },
    {
      type: 'defense',
      maxValue: 230,
    },
    {
      type: 'special-attack',
      maxValue: 194,
    },
    {
      type: 'special-defense',
      maxValue: 230,
    },
    {
      type: 'speed',
      maxValue: 180,
    },
  ];

  ngOnInit(): void {
    const typeStat = this.stats.find(
      (stat) => stat.type == this.statsCurrent.stat.name
    );

    if (typeStat) {
      this.progress = (this.statsCurrent.base_stat / typeStat.maxValue) * 100;
    }
  }
}
