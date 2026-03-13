package com.expense.tracker.payload.response;

import lombok.Data;
import java.math.BigDecimal;
import java.util.Map;

@Data
public class DashboardResponse {
    private BigDecimal totalIncome;
    private BigDecimal totalExpenses;
    private BigDecimal monthlyExpenses;
    private BigDecimal balance;
    private Map<String, BigDecimal> categorySpending;
}
