package com.expense.tracker.payload.response;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class TransactionResponse {
    private Long id;
    private String description;
    private BigDecimal amount;
    private String category;
    private String type;
    private LocalDate date;
}
