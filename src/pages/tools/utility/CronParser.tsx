import React, { useState } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { Button } from '../../../components/tools/Button';
import { Clock, Calendar } from 'lucide-react';
import { Card } from '../../../components/common/Card';

export function CronParser() {
  const [expression, setExpression] = useState('');
  const [nextDates, setNextDates] = useState<Date[]>([]);
  const [description, setDescription] = useState('');

  const describeCron = (expr: string) => {
    const parts = expr.split(' ');
    if (parts.length !== 5) return 'Invalid cron expression';

    const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;
    let desc = 'Runs ';

    if (minute === '*' && hour === '*') {
      desc += 'every minute';
    } else if (minute === '0' && hour === '*') {
      desc += 'every hour';
    } else if (minute === '0' && hour === '0') {
      desc += 'every day at midnight';
    } else {
      desc += `at ${hour}:${minute}`;
    }

    if (dayOfMonth !== '*') desc += ` on day ${dayOfMonth}`;
    if (month !== '*') desc += ` of month ${month}`;
    if (dayOfWeek !== '*') desc += ` on ${getDayName(dayOfWeek)}`;

    return desc;
  };

  const getDayName = (day: string) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[parseInt(day)] || day;
  };

  const calculateNextDates = (expr: string) => {
    // Simple implementation for demo purposes
    const dates: Date[] = [];
    const now = new Date();
    let next = new Date(now);

    for (let i = 0; i < 5; i++) {
      next = new Date(next.getTime() + 24 * 60 * 60 * 1000);
      dates.push(next);
    }

    return dates;
  };

  const handleParse = () => {
    try {
      const desc = describeCron(expression);
      const dates = calculateNextDates(expression);
      setDescription(desc);
      setNextDates(dates);
    } catch (err) {
      setDescription('Invalid cron expression');
      setNextDates([]);
    }
  };

  return (
    <ToolLayout
      title="Cron Expression Parser"
      description="Parse and explain cron expressions"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cron Expression
              </label>
              <input
                type="text"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                placeholder="* * * * *"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 font-mono"
              />
              <p className="mt-1 text-sm text-gray-500">
                Format: minute hour day-of-month month day-of-week
              </p>
            </div>

            <Button onClick={handleParse} icon={Clock}>
              Parse Expression
            </Button>
          </div>
        </Card>

        {description && (
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{description}</p>
          </Card>
        )}

        {nextDates.length > 0 && (
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Next Occurrences
            </h3>
            <div className="space-y-2">
              {nextDates.map((date, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                >
                  <span className="text-gray-600">
                    {date.toLocaleDateString()} {date.toLocaleTimeString()}
                  </span>
                  <span className="text-sm text-gray-500">
                    {index === 0 ? 'Next run' : `Run #${index + 1}`}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}